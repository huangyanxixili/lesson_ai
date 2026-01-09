# Git 提交的 AI 神器

- 需求
  - 规范的 git 提交信息是很重要的
    - 项目的日志
    - 工作业绩的审核，leader 要看
    - 新手可以像高手一样高质量提交代码（git 高级规范）

- 技术构成 
  - 全栈项目
  - 前端 react + tailwindcss + axios 
  - 后端 node express 

- 前后端分离
  - server（nodemon index.js）
    - 运行在服务器
    - 提供api 接口，在 3000端口 伺服   
    http://localhost:3000
  - frontend（npm run dev）
     在用户的浏览器上运行（v8引擎、js运行的宿主）
     http://localhost:5173   Web
  - AI （ollama run deepseek-r1:8b）
    - ollama 部署开源大模型 deepseek-r1:8b GPU（reasoning1）
    - 像openai 一样的api 接口 :11434

## express
- node 老牌的敏捷开发框架 
- app 后端应用
- listen 3000 端口伺服
- 后端路由 path
    网站本质是提供 资源（JSON等） 和 服务（登录等业务） 的  
    app.get('/hello', (req, res) => {
    })
    http 是基于请求响应的简单协议 http://localhost:3000
    通过 ip 就可以找到服务器
    3000 端口对应是 应用 express 在监听
    应用提供了 path 用 GET访问 
    GET就是对资源的操作 CRUD（增删改查）
    req 请求对象
    res 响应对象

- apifox 测试api 接口
- nodemon 边调试边开发
- express 默认不支持req.body 解析
   - 加一个 json 解析中间件 
    请求  中间件1，中间件2 ...  响应
- GET 和 POST 的区别
   - GET 没有请求体、POST有 
- 中间件
    app.use(express.json()) 解析请求体的 JSON 数据
- 响应头、响应体
     合适的状态码
       - 1XX 请求中... 
       - 200 成功响应
       - 201 Created 成功创建资源
       - 3XX 重定向 redirect 
       - 400 Bad Request 路由不存在 
       - 404 Not Found 资源不存在 
       - 401 Unauthorized 未授权
       - 500 Internal Server Error 服务器错误（后端问题）

## 跨域
有风险
- 从国内去缅甸 --> 跨域了
  www.baidu.com（要负责用户的安全） 向 www.dy.com 发送请求 --> 跨域了
  http:// 协议  www.baidu.com 域名   :3000 端口
  前端 5173端口    后端 3000端口
  - 同源策略CORS（Cross Origin Resource Share）  跨域就会 直接放弃请求（认为不安全）
  - 端口不一样 也会跨域 非常严格
    协议、域名、端口 一样，缺一不可
    浏览器会将跨域请求阻止
  - 解决跨域 日常问题  

  - 前端发起跨域接口请求（端口port），需要数据
  - 浏览器 用户只是小白 访问www.baidu.com 同源策略（block阻止对其他页面请求）
  - 后端 默认没有开启跨域的允许
    如果允许 就像给你出国办理了一个签证，浏览器就会放行 
    .use(cors()) 