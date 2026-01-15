# AI 全栈项目

## 技能点
### react 开发全家桶
- react + typescript (高级JS)
- react-router-dom (前端路由) 
- zustand (中央状态管理库)
- axios (前端http请求库)

### 后端
- node + typescript (后端TS)
- nestjs (企业级别后端开发框架)
- psql (数据库)
- redis (缓存数据库)

### AI
- langchain
- coze/n8n (工作流)
- LLM
- trae/cursor 

## 项目结构
- frontend 前端项目
- backend 后端项目
- ai_server
- admin 后台管理系统

## git 操作
- 全新的实战项目
    git init
- 提交的时机
    每次完成一个相对独立的模块后，提交代码到git仓库
    提交信息要准确完整


## react 全家桶
### react-router-dom 
- 前端路由 
     早期前端没有路由，路由由后端掌控，前端只是切图仔
     现在要 前后端分离，前端有独立的（基于HTML5）路由，实现页面切换。 
     - 两种形式
        1. HashRouter #/ 不美观，很温柔 兼容性很好 瞄点
        2. BrowserRouter / 和后端路由一样，需要使用到html5 history API 兼容不好（ie11 之前不兼容），现在的浏览器几乎都支持
     - as Router 可读性更好（重命名）
     - 性能，速度优先 --> 页面组件的懒加载
         / 首页只需要加载 Home组件 ，其他路由在需要的时候再加载（延迟加载）
         /about 只需要加载 About组件 

### 路由有多少种？
1. 普通路由
2. 动态路由 /profile/:id
3. 通配路由 /profile/*
4. 嵌套路由  Outlet组件
    > `<Outlet>` 是 React Router DOM 中的组件，用于在父路由元素中渲染其子路由匹配到的内容。
5. 鉴权路由（路由首位） ProtectRouter
6. redirect 重定向路由 Navigate

### 路由生成访问历史
    history对象 栈结构 先进后出 
    replace redirect 跳转，会跳转当前的历史记录
### 单页应用
- 传统开发是多页的，基于http请求，每次URL发生改变，就会去服务器重新请求整个页面
   体验不好，页面会白一下
- 单页应用 react-router-dom html5 history 
   前端路由
   路由改变后
   前端会收到一个事件，将匹配的新路由显示在页面上

## typescript
JavaScript 超级版 --> TypeScript，让 JS 变成强类型静态语言
- 安装 ts 
    npm install -g typescript
- ts 的优点
   - 静态类型 
   - 边写边检测bug
   - 编译时检查类型错误
   - 代码建议，文档查看都非常方便
   - 没有使用变量等垃圾代码提示未使用  
        1. `console.log()`
        2. 重构、修改别人的代码
     这样就可以拿到 干净的代码

### typescript 实战 todos


### zustand 状态管理
如果说国家需要有中央银行，那么前端项目就需要中央状态管理系统 zustand / redux
- 组件 = UI + State 
- store 将状态存放到store仓库中管理
    全局共享
- 基于hooks思想实现