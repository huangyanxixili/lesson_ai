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
                    const response = await fetch('http://api.deepseek.com/v1/chat/completions', {
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
                    // SSE 二进制流 reader 对象 接根管子一样
                    const reader = response.body.getReader();
                    // 将 ArrayBuffer 或 TypedArray 解码为字符串
                    const decoder = new TextDecoder();
                    while(true) {
                        const { done, value } = await reader.read();
                        // console.log(done, value, '------------------------');
                        if (done) break;
                        const chunk = decoder.decode(value);
                        // console.log(chunk, '------------------------');
                        const lines = chunk.split('\n');
                        for (let line of lines) {
                            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                                try {
                                    const data = JSON.parse(line.slice(6));
                                    const content = data.choices[0]?.delta?.content || '';
                                    if (content) {
                                        res.write(`0:${JSON.stringify(content)}\n`);
                                    }
                                } catch(err) {
                                    console.log(err, '------------------------');
                                }
                            }
                        }
                    }
                    res.end();
                } catch(err) {

                }
            })
        }
    }
]