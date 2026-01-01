import 'dotenv/config'; // 读取.env中的环境变量
// console.log(process.env.DEEPSEEK_API_KEY, '////')
import { ChatDeepSeek } from '@langchain/deepseek';

const model = new ChatDeepSeek({
    model: 'deepseek-reasoner', // 推理
    temperature: 0
    // langchain 帮我们适配了市面上大多数的LLM
    // 适配器模式：LangChain 的设计思想
    //   - 对外（对你）：暴露的是 LangChain 统一的标准接口，让你感觉不到你在调 DeepSeek。
    //   - 对内（对API）：帮你处理了所有脏活累活——自动填充 baseURL 、自动从环境变量读取 API_KEY 、自动组装请求头。
    // baseURL ? 不需要  @langchain/deepseek这个专用包内部已经把 DeepSeek 的官方 API 地址内置在代码里了
    // apiKey ? 不需要 
})

// invoke（调用） 执行
const res = await model.invoke('用一句话解释什么是RAG？')
console.log(res.content);