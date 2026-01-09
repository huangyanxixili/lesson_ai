import express from "express"; // 引入后端框架
import cors from 'cors'; // 引入跨域模块
// langchain 支持 ollama
import { ChatOllama } from "@langchain/ollama";
// prompt 模板
import { ChatPromptTemplate } from "@langchain/core/prompts";
// 输出格式化模块
import { StringOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "deepseek-r1:8b",
  temperature: 0.1, // 严格
});

// web server 基于 http 协议，在某个端口(3000)进入 伺服 状态 需要路由
const app = express(); // 创建一个 express 应用 -> server app

// 注册 跨域配置 CORS 中间件 允许跨域
app.use(cors()); // 不配置就全开放

// express 默认不支持 JSON 解析，要提前注册解析 JSON 的中间件
app.use(express.json()); // JSON对象 解析成 JS对象

// 路由 get->method  路径->/hello（规则注册）
// req 请求对象  res 响应对象
app.get("/hello", (req, res) => {
  res.send("hello world");
});

app.post("/chat", async (req, res) => {
  // 处理函数
  console.log(req.body);
  const { message } = req.body; // 解构请求体里解构用户的提问内容
  // 后端稳定第一，需要更严谨
  if (!message || typeof message !== "string") {
    // 响应头 statusCode 400 用户请求错误
    // 响应体是json格式的话
    // send 返回文本 现在后端api服务数据接口格式是json
    return res.status(400).json({
      error: "message 必填，必须是字符串",
    }); // 完整的响应
  }
  // 容错
  try {
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a helpful assistant."],
      ["human", "{input}"],
    ]);

    const chain = prompt
        .pipe(model)
        .pipe(new StringOutputParser());
    console.log("正在调用大模型");

    const result = await chain.invoke({
      input: message,
    });

    res.json({
      reply: result,
    });
  } catch (e) {
    res.status(500).json({
      error: "调用大模型失败",
    });
  }
  // res.send(message);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
