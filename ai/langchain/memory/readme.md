# LLM 记忆

- LLM api 调用和http请求一样, 都是无状态的
- 怎么让LLM 有记忆?
    维护一个对话历史记录,每次调用LLM 时,都会把历史记录带上.
    ```js
    messages: [
        {
            role: 'user',
            content: '我叫西西里,喜欢喝白兰地',
        },
        {
            role: 'assistant',
            content: '---------------',
        },
        {
            role: 'user',
            content: '你知道我是谁?',
        },
    ]
    ```

## 多轮会话
- LLM 调用是无状态的
- 多轮会话 维护一个历史记录messages,每次调用LLM时,都带上历史记录
   - 维护对话 
   - 对话记录越来越多，会占用更多的token，开销太大


## memory AI 应用的模块 langchain
