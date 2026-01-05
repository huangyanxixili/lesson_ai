import {
    ChatDeepseek,
} from "@langchain/deepseek";
import 'dotenv/config';

const model = new ChatDeepseek({
    model: 'deepseek-chat',
    temperature: 0.7,
});

// http api 请求
const res = await model.invoke('我叫西西里,喜欢喝白兰地');
console.log(res.content);
console.log('-----------------');
const res2 = await model.invoke('我叫什么名字');
console.log(res2.content);
