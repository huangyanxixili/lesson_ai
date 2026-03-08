import {
    Injectable
} from '@nestjs/common';
import type { Message } from './dto/chat.dto'
import { ChatDeepSeek } from '@langchain/deepseek'
import { 
    HumanMessage,
    AIMessage,
    SystemMessage 
} from '@langchain/core/messages';
import { OpenAIEmbeddings, DallEAPIWrapper } from '@langchain/openai';
import * as fs from 'fs/promises'; // promisify
import path from 'path';
// 向量数据库，ai应用功能的一个核心之一
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';

interface Post {
    title: string;
    category: string;
    embedding: number[];
}

export function convertToLangChainMessages(messages: Message[]) 
// 联合类型
: (HumanMessage | AIMessage | SystemMessage)[] {    
    return messages.map(msg => {
        switch(msg.role) {
            case 'user':
                return new HumanMessage(msg.content);
            case 'assistant':
                return new AIMessage(msg.content);
            case 'system':
                return new SystemMessage(msg.content);
            default:
                throw new Error(`Unsupported role: ${msg.role}`);
        }
    })
}

// 计算两个向量的余弦相似度
export function cosineSimilarity(v1: number[], v2: number[]): number {
    const dotProduct = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
    const normV1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const normV2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normV1 * normV2);
}

@Injectable()
export class AIService{
    private posts: Post[] = [];
    private chatModule: ChatDeepSeek; // llm 成为service 一个私有属性
    private embedding: OpenAIEmbeddings;
    private imageGenerator: DallEAPIWrapper;

    constructor() {
        this.chatModule = new ChatDeepSeek({
            configuration: {
                apiKey: process.env.DEEPSEEK_API_KEY,
                baseURL: process.env.DEEPSEEK_API_BASE_URL,
            },
            model: 'deepseek-chat',
            temperature: 0.7,
            streaming: true,
        })
        this.embedding = new OpenAIEmbeddings({
            configuration: {
                apiKey: process.env.OPENAI_API_KEY,
                baseURL: process.env.OPENAI_BASE_URL
            },
            model: 'text-embedding-ada-002'
        })
        this.imageGenerator = new DallEAPIWrapper({
            openAIApiKey: process.env.OPENAI_API_KEY,
            n: 1,
            size: '1024x1024',
            quality: 'standard'
        })
        this.loadPosts();
    }   

    // 封装类的实现细节，复杂性
    private async loadPosts() {
        try {
            console.log(__dirname, "//////")
            // nestjs compile ts -> js -> dist
            // nest-cli assets data/**/*/ 放到 dist 目录下
            const filePath = path.join(__dirname, "../", "data", "posts-embedding.json");
            const data = await fs.readFile(filePath, 'utf-8');
            this.posts = JSON.parse(data);
        } catch(err) {
            console.error('Failed to load posts', err)
            this.posts = [];
        }
    }

    async chat(messages: Message[], onToken: (token: string) => void) {
        const langChainMessages = convertToLangChainMessages(messages);
        // console.log(langChainMessages, '/////');
        const stream = await this.chatModule.stream(langChainMessages);
        for await (const chunk of stream) {
            const content = chunk.content as string; // 断言类型（一定是字符串）
            // console.log(content, '//////')
            // 用模块化的方式，回调传递token
            if (content) {
                onToken(content);
            }
        }
    }

    async search(keyword: string, topK: number = 3) {
        const vector = await this.embedding.embedQuery(keyword);
        // console.log(vector, '///////');
        const results = this.posts.map(post => ({
            ...post,
            similarity: cosineSimilarity(vector, post.embedding)
        }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK)
            .map(item => item.title)

        return {
            code: 0, // 没有任何错误
            data: results
        }
    } 

    async avatar(name: string) {
        const imgUrl = await this.imageGenerator.invoke(`
            你是一位头像设计师，根据用户的名字${name}，设计一个专业的头像。
            设计风格卡通，时尚，好看。    
        `)
        console.log(imgUrl);
        return imgUrl;
    }

    async rag(question: string) {
        // 知识库 embedding
        // 内存向量数据库
        // 向量 -> 向量存储 源文件（Document） this.embeddings(llm) 最终结果存储下来
        const vectorStore = await MemoryVectorStore.fromDocuments(
            [
                new Document({
                    pageContent: "React是一个用于构建用户页面的JavaScript库",
                }),
                new Document({
                    pageContent: "Nest.js 是一个用于构建服务器端应用的node.js框架，擅长企业级开发",
                }),
                new Document({
                    pageContent: "RAG 通过检索外部知识，增强大模型的回答能力",
                }),
            ],
            this.embedding
        )

        // 相似度
        const docs = await vectorStore.similaritySearch(question, 1);
        // console.log(docs, '//////');
        // llm chat 的上下文 增强Augument
        // 检索 retrieve
        const context = docs.map(d => d.pageContent).join('\n');
        // 增强 Augumented
        const prompt = `
            你是一个专业的JS工程师，请基于下面的资料回答问题。
            资料：
            ${context}

            问题：
            ${question}
        `

        // 生成 Generation
        const res = await this.chatModule.invoke(prompt);
        console.log(res);
        return res.content;
    }
}