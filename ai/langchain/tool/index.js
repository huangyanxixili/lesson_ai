import { ChatDeepSeek } from "@langchain/deepseek";
import 'dotenv/config';
import { tool } from "@langchain/core/tools";
import { z } from "zod"; // 用于定义工具的输入参数的类型


const fakeWeatherDB = {
    北京: { temp: "30°C", condition: "晴", wind: "微风" },
    上海: { temp: "28°C", condition: "多云", wind: "东风 3 级" },
    广州: { temp: "32°C", condition: "阵雨", wind: "南风 2 级" },
}

const weatherTool = tool(
    async ({ city }) => {
        const weather = fakeWeatherDB[city];
        if(!weather) {
            return `暂无${city}的天气信息`
        }
        return `当前${city}的天气是${weather.temp}, ${weather.condition}, 风力${weather.wind}`
    },
    {
        name: "get_weather",
        description: "查询指定城市的今日天气情况",
        schema: z.object({
            city: z.string().describe("要查询天气的城市")
        })
    }
)


// 函数 定义一个加法工具
const addTool = tool(
    // 等待大模型来调用
    // 工具只能接收一个参数，所以使用 对象（解构 a, b两个参数）
    async ({ a, b }) => String(a + b), // 执行函数
    {
        // 工具名称
        name: "add",
        // 工具说明书：描述工具能做什么、何时使用、输入输出约束
        description: "计算两个数字的和",
        // 工具参数的类型定义
        schema: z.object({
            a: z.number().describe("第一个数字"),
            b: z.number().describe("第二个数字"),
        }),
    }
)
// console.log(weatherTool)

const model = new ChatDeepSeek({
    model: "deepseek-chat",
    temperature: 0
}).bindTools([addTool, weatherTool]);


// const res = await model.invoke("3 + 5等于多少？")
const res = await model.invoke("北京今天的天气怎么样？")

// "?."：可选链预算符 es6后新增 利于代码的简洁与优雅
// 常用于：安全访问可能不存在的嵌套属性或方法，避免抛出 TypeError（出错返还undefined）
// 用户可能并没有使用到 tool 工具，那么就返还的 tool_calls 字段可能没有
if(res.tool_calls?.length) {
    // console.log(res.tool_calls[0]);
    if(res.tool_calls[0].name === "add") {
        const result = await addTool.invoke(res.tool_calls[0].args)
        console.log("最终结果：", result);
    } else if(res.tool_calls[0].name === "get_weather") {
        const result = await weatherTool.invoke(res.tool_calls[0].args)
        console.log("最终结果：", result);
    }
}