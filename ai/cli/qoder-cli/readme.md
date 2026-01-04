# qoder-cli
命令行AI coding Agent 
    基于阿里的qwen 编程大模型，构建AI Agent的命令行框架

- 安装
npm i -g @qoder-ai/qodercli

- /init 初始化项目 创建一个AGENTS.md文件
    AI 开发项目 要给LLM提供一个项目规矩的上下文 --> AGENTS.md

## Trae/Cursor 还需要有qoder-cli/claude-cli 这些编辑器呢？
未来的**开发界面**不会只有IDE，还会有cli，最好的是两者融合。
IDE 适合深度上下文与复杂任务处理
CLI 具备速度、灵活性与自动化能力
双AI引擎的新AI编程模式
命令行可以完成 端到端的AI自主开发模式

## mcp Model Context Protocol
MCP 让AI应用以统一的方式向大模型提供结构化上下文（如工具、文档、数据库）
eg：安装两个mcp
- qodercli mcp add playwright -- npx "@playwright/mcp@latest"
- qodercli mcp add context7 -- npx @upstash/context7-mcp@latest

检查：qodercli mcp list

## context7
当LLM 生成的代码是老版本，或不太行的时候 context7 来了
langchain 
context7 是一个mcp服务，在生成代码指令发出前，带上指定的版本的库的文档作为上下文