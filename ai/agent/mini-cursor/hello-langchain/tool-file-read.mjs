import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { Tool, tool } from "@langchain/core/tools";
import {
    HumanMessage,  // 用户 → 大模型 的消息
    SystemMessage, // 开发者/系统 → 大模型 的“最高优先级指令/规则”
    ToolMessage,   // 工具 → 大模型 的消息（工具执行结果回传给大模型）
} from "@langchain/core/messages"; // 规范消息类型
// node 内置的文件模块 异步I/O 操作
import fs from 'node:fs/promises';
// 数据校验 zod，tool parameter 参数校验（验证确保数据符合预期类型）
import { z } from "zod";

const model = new ChatOpenAI({
    modelName: "qwen-coder-turbo",
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
    temperature: 0,
})

// 原生写法 很麻烦
// 新建一个tool 
const readFileTool = tool(
    // tool 处理函数的函数体
    // 先通过tool读取文件内容，path 作为参数传入，使用 fs.readFile 读取文件内容
    async ({ path }) => {
        const content = await fs.readFile(path, 'utf-8');
        console.log(`[工具调用] read_file("${path}") 成功读取 ${content.length} 字节`);
        return content;
    },
    {
        name: "read_file",
        description: `
            用此工具读取文件内容。当用户需要读取文件、查看代码、分析文件内容时，调用此工具。
            输入文件路径（可以是相对路径或绝对路径）
        `,
        schema: z.object({ path: z.string().describe("要读取的文件路径") }),
    }
);

const tools = [
    readFileTool,
];

// 把一组 tools（工具定义）绑定到 model 上，得到一个“带工具能力”的模型实例 modelWithTools
// langchain 提供了一个工具方法 bindTools，用于将一组工具绑定到模型上
const modelWithTools = model.bindTools(tools);

// 对话记录
const messages = [
    // 为模型提供一个身份
    new SystemMessage(`
        你是一个代码助手，可以使用工具读取文件并解释代码。

        工作流程：
        1. 用户要求读取文件时，立即调用 read_file 工具
        2. 等待工具返回文件内容
        3. 基于文件内容进行分析和解释

        可用工具：
        - read_file: 读取文件内容（使用此工具来获取文件内容）    
    `),
    // 用户需求
    new HumanMessage(`请读取tool-file-read.mjs文件内容并解释代码`)
];

// llm 返回的决策 
//      1. 不需要工具，直接回复答案。
//      2. 包含需要调用某些工具的请求，tool_calls（模型需要调用的工具）就会有内容
//          - 其中name:工具名，args:工具参数 等...
let response = await modelWithTools.invoke(messages);
// 把 llm 要调用 tool 的回复也加入到 messages（对话记录） 中，形成多轮对话
messages.push(response); 

while (response.tool_calls && response.tool_calls.length > 0) {
    console.log(`\n[检测到 ${response.tool_calls.length} 个工具调用]`);
    const toolResults = await Promise.all( // 并发执行，并等待全部完成后，将每次调用的结果依次放入toolResults数组中
        response.tool_calls.map(async (toolCall) => {
            const tool = tools.find(t => t.name === toolCall.name);
            if (!tool) {
                return `错误：找不到工具 ${toolCall.name}`;
            }
            console.log(`[执行工具] ${toolCall.name}(${JSON.stringify(toolCall.args)})`);
            try {
                const result = await tool.invoke(toolCall.args); // 调用工具
                return result;
            } catch(error) {
                return `错误：${error.messages}`;
            }
        })
    )
    // console.log(toolResults); // 【调用完A的结果，调用完B的结果】

    response.tool_calls.forEach((toolCall, index) => {
        // 将工具输出（ToolMessage）再放入到 messages（对话记录）中
        messages.push(
            // 将函数执行后的结果（toolResults） --转换为--> 模型能理解的对话消息（ToolMessage） 
            new ToolMessage({
                // 将先前工具调用后的执行结果（第 index 个工具调用的执行结果），放入消息内容中
                content: toolResults[index],
                tool_call_id: toolCall.id,
            })
        )
    })
    console.log(messages);

    // 让模型再次消化结果，决定是否需要再次调用工具
    response = await modelWithTools.invoke(messages);
    // 如果不再有 tool_calls了，说明对话结束了
    console.log(response);
}

// console.log(response.content);