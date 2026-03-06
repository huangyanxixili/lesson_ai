import { client } from './app.service.mjs';
// 支持 promisify fs 模块 thenable
import fs from 'fs/promises'; // node 内置的文件模块（Promise版，用于读写文件）

// const content = await fs.readFile('./data.txt', 'utf-8');
const inputFilePath = './data/posts.json'; // 读取原始数据文件内容
const outputFilePath = './data/posts-embedding.json'; // 处理后的结果文件，写入embedding（向量）

const data = await fs.readFile(inputFilePath, 'utf-8'); // 异步读取文件内容，并且编码为UTF-8
const posts = JSON.parse(data); // 解析JSON字符串为JavaScript对象
// console.log(posts);

const postWithEmedding = [];

for (const { title, category } of posts) {
    // 调用 OpenAI API 生成文本的嵌入向量（embedding）
    const response = await client.embeddings.create({
        model: 'text-embedding-ada-002',
        input: `标题：${title} 分类：${category}`,
    })

    // 存储结果
    postWithEmedding.push({
        title,
        category,
        embedding: response.data[0].embedding,
    });
}

// 将js数组重新转成JSON字符串，并且写入到outputFilePath指定的文件中
// JSON.stringify(未转义结果, 不做任何过滤和修改, 格式化输出2个空格缩进)
await fs.writeFile(outputFilePath, JSON.stringify(postWithEmedding, null, 2));
