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

@Injectable()
export class AIService{
    private chatModule: ChatDeepSeek; // llm 成为service 一个私有属性
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
}