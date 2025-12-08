# AI First
   - vibe coding + gemini等
        自然语言生成sql 和我们应用结合起来
        SQL 语法
   - mvc 代码coding


- Mobile First
    css @media
    PC / Mobile 

    Mobile First 开发移动端优先 小程序产品/APP 80%
    适配下PC端 20% 工作为主

## 点奶茶
传统：
- 打开美团app -> 中心 

AI First（Agent）
   - 和豆包说：帮我点一杯奶茶，少糖 热的，并且在美团/抖音/淘宝上比价，用上优惠券，在最便宜的那家下单
   - LLM 能够接入且调度的服务出现

## modelscope
- 阿里云提供的开源大模型社区
    就像移动端的 应用市场 -> 阿里云的 大模型市场
- 数据集
    微调大模型
- python notebook（基于sqlist3 -> text2sql）

```python
# 1、创建标准化表的数据表，通过PRAGMA table_info() 自动提取schema（表结构）
# 2、schema智能转化：自动将数据库元数转换为LLM能理解的格式
schema_str = "CREATE TABLE EMPLOYEES (\n" + "\n".join([f"{col[1]} {col[2]}" for col in schema]) + "\n)"
# 3、设计专用的prompt模板
def  ask_deepseek(query, schema):
    prompt = f"""
    这是一个数据库的Schema:
    {schema}
    根据这个Schema，请输出一个SQL查询来回答以下问题。
    只输出SQL查询语句本身，不要使用任何Markdown格式，
    不要包含反引号、代码块标记或额外说明。
    问题：{query}
    """
    print(prompt)
    response = client.chat.completions.create(
        model="deepseek-chat",
        max_tokens=2048,
        messages=[{
            "role": "user",
            "content": prompt
        }],
        temperature=0
    )
    return response.choices[0].message.content
# 4、返还查询或执行结果，完整的闭环验证
```

这样降低做降低了技术门槛，通过AI让普通员工也能通过对话修改数据
通过AI将复杂的操作变成对应的SQL语句