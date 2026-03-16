# MCP

- llm with tools
    read write listDir exec -> tool
    llm + tools = Agent
    LLM 真的能干活了

- mini-cursor 
    llm with tools 不太满意的地方？
    怎么把 llm 能干活的能力扩大呢？ 更多的tools，更好的tools，第三方的tools
    即 向外提供tool 一些大厂将自己的服务以mcp的方式向外提供
    - 80% 的APP 会消失
    - 集成第三方的 MCP 服务，mcp其实就是tool
    - node 调用 java/python/rust 等其他语言的tool 
    - 远程的tool

## MCP（本质上就是tool）
Model Context Protocol Anthorpic
在大量的将本地，跨语言、第三方的tool 集成到 Agent 里来的时候，让 llm 强大的同时，也会带来一定的复杂性（对接连调）
- 但是 大家都按照一个约定来

## 按 MCP 协议来开发，将我们的服务或资源 输出出去 

## MCP 协议 还有通信部分
    - stdio 本地命令行（标准输入输出）
    - http 远程调用

## MCP 最大的特点就是可以 跨进程调用工具
    - 子进程 node:child-process
    - 跨进程 java/rust
    - 远程进程
    llm 可以干更强大的任务
    繁杂（本地、跨语言、跨部门、远程） 不同的通信方式（stdio，http）
    规范的提供工具和资源，mcp 协议

## 编写满足mcp协议规范的tool
- Model Context Protocol（模型上下文规范）
    tool -> 返回的 result
- Anthorpic 24年底 25年底 贡献给开源社区
- pnpm i @modelcontextprotocol/sdk  官方的SDK，用于开发一个MCP 服务器 / MCP 工具
