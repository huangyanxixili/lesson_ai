# langchain 学习

2022年 chatgpt 横空出世 transformer 架构 aigc
 
langchain 比 chatgpt 还早 最近推出了1.0+版本
AI 应用开发框架

## langchain = lang + chain
lang  = language LLM 
chain = 类似于 n8n coze 中的 node 链接起来

基于 node 开发的 

- 项目使用 esm
    package.json 中 type:module 表示项目使用 esm 模块规范
    - npm i @langchain/deepseek 让LLM变得可拔插
      LLM 性价比、更新换代频繁
    - langchain 统一接口调用 不同的 LLM
      completion 文本补齐
      chat 聊天对话

## Demo1