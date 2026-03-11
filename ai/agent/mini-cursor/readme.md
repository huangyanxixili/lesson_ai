# 手写cursor 最小版本

## 近期Agent 火爆产品
- 千问点奶茶 豆包 元宝
    互联网计算向 AI Agent 推理，运行的一个划时代的产品。更复杂，更智能，更强大。
- OpenClaw 养虾
    一人公司 
    虚拟数字人，多Agent
    编程Agent（cursor） ppt 算账 市场
    任务拆解、计划，找到一批需要的Agent 
    Manus ？ 
    开源版本的 Manus
- seedance 抖音视频的数据

- 从 llm prompt engineering（DeepSeek） -> Agentci（智能） Engineering（全栈）

- AI Agent 如何打造 ?
    - 直接调用大模型？ 获得智能，生成代码
        Gemini 3.1 pro
    - 你上周和它聊过的消息，它是不是记不住         Memory：能记录和读取过去信息的记忆系统
    - 你让他帮你访问一个网页，做一些事情           Tool：模型可以调用的外部能力
    - 你想让他基于公司内部的私密文档做一些解答     RAG：检索增强生成（问题向量化 + 检索内容 + 构造增强的prompt）

    AI Agent = llm + Memory + Tool + RAG

## Agent 是什么？
其实就是给大模型扩展了Tool 和 Memory，他本来就可以思考、规划，你给他用tool 扩展了能力
他就可以**自动**做事情，用memory 管理记忆，他就可以记住你想让它记住的东西
还可以使用 RAG 查询内部知识来获取知识（context）

这样一个知道内部知识（RAG）、能思考规划、有记忆（Memory），能帮你做事情（Tool）的扩展后的大模型，就是一个Agent


## Tool 工具

### 用 react 创建一个todoList
- 任务，期待Cursor 编程Agent 完成
- llm 思考（thinking），规划（planing） aigc 生成代码
- tool 让llm拓展 有读写文件的能力，项目就生成了
- tool bash 执行命令

### Langchain
AI Agent 框架 提供了 memory tool RAG 的封装
后端功底（node） nest.js

# AI 全栈Agent 开发

## LLM with Tools
- llm 选择
    qwen-coder
- tools 
    [read, write, exec]
- pnpm i @langchain/openai 适配了常见的模型


