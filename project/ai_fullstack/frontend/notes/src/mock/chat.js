// 流式输出，本质是（llm token 生成）边算边给，而不是等全部结果生成再一次性返回
// AI 场景中，模型生成文本是逐个token 产生的（模型每次基于已生成的token序列，通过自回归方式预测下一个最可能的方式预测下一个最可能的token）
// streaming: true
// http chunked 数据块来传，res.end()不用这个
// res.write(chunk) 写入数据块
// SSE text/event-stream 事件流
import { config } from 'dotenv';
config();

export default [
    {
        url: '/api/ai/chat',
        method: 'post',
        // rawResponse 用于自定义原始 HTTP 响应（如流式输出），而response 通常指封装后的结构化响应
        rawResponse: async (req, res) => {
            // node 原生的去拿到请求体
            // chunk 数据块（buffer 二进制）
            // tcp/ip 可靠的传输协议 流式传输数据
            // 按顺序组装，失败要通知重传
            let body = '';
            // chunk 二进制流 buffer
            // += 将 chunk 变成字符串 与 body 拼接
            req.on('data', (chunk) => { body += chunk })
            req.on('end', async () => {
                // 收到全部
                // console.log(body, '?????');
                try {   
                    const { messages } = JSON.parse(body);

                    // 响应头先告诉浏览器 流式的，数据会分块传输
                    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                    res.setHeader('Transfer-Encoding', 'chunked');
                    // vercel ai sdk 特制头
                    res.setHeader('x-vercel-ai-data-stream', 'v1');
                    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`
                        },
                        body: JSON.stringify({
                            model: 'deepseek-chat',
                            messages: messages,
                            stream: true, // 开启流式输出
                        })
                    })
                    if (!response.body) throw new Error("No response body");
                    // SSE 二进制流 reader 对象
                    // LLM 输出和解析之间接根管子一样 
                    // reader对象读取，llm输出的token流
                    const reader = response.body.getReader(); // token 
                    // 通过 TextDecoder（文本解码器） 将 Uint8Array字节数据 解码为 可读的UTF-8字符串
                    const decoder = new TextDecoder();
                    while(true) {
                        // llm 的这一次的生成，被读取了
                        // 事件，有新的token生成了
                        const { done, value } = await reader.read(); 
                        console.log(done, value, '------------------------');
                        // done：是否完成, value：当前读取到的二进制数据块
                        if (done) break;
                        // 解析出 token => 字符串 LLM 内部 数学向量
                        // chunk 是一个文本行，其开头data是前缀，{}内是json字符串
                        // choices[0].delta.content就是拿到的 token 字符串
                        const chunk = decoder.decode(value);
                        console.log(chunk, '------------------------'); // chunk包含了 token 信息
                        // 其中的 delta 是增量，每次拿到的 delta.content，就是这一小次新增的那几字符，而不是完整句子
                        const lines = chunk.split('\n'); // 按行分割，拿到每一行有效数据
                        for (let line of lines) { // 不需要用到下标就用for of，计数循环比较机械
                            // startsWith es6的语法
                            // 判断 字符串开头是否包含指定的子字符串，更优雅
                            // data: [DONE] 结束信号
                            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                                try {
                                    const data = JSON.parse(line.slice(6));
                                    // ?. 代码的健壮性
                                    const content = data.choices[0]?.delta?.content || '';
                                    if (content) {
                                        // 发送给前端 SSE核心
                                        // 向输出流不断的写入content
                                        // ai-sdk 要求的格式
                                        res.write(`0:${JSON.stringify(content)}\n`);
                                    }
                                } catch(err) {

                                }
                            }
                        }
                    }
                    // 结束响应
                    res.end();
                } catch(err) {

                }
            })
        }
    }
]