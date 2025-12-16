# 现代前端开发框架**工程化**

- npm init vite 新建项目
    vite? 
        Vue作者尤雨溪开发的现代前端**构建工具**，它利用浏览器原生ES模块实现 极速的冷启动 和 热更新，配置主流框架，大幅提升开发体验
   - 得到一个比较标准的项目开发模板 
        优秀的架构

## 优秀架构
- vite 会将根目录下 index.html 作为项目的首页启动
    #root 是组件的挂载点
    App.vue 根组件
- vite 为了构建项目，是具体业务开发之前的基石
  - 返回了 项目开发模板  
  - npm i 安装依赖
        package.json
    ```json
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    }
    ```
      - vite 构建的管家
            开发的是前端项目 vue3 前端开发目录 src/
            vite 是基于node的
                npm init vite
                npm run dev
          - localhost: 5173 启动项目
          - 自动打开浏览器 node 操作os   
          - 热更新 监听任何文件的修改，浏览器会自动刷新

- src/ 前端开发目录
  - main.js 入口文件
  - App.vue 根组件
  - style.css 全局样式
  - components/ 组件目录

- Volar 是 Vue 官方的 VS Code 插件
    提供了 Vue 3 的语法高亮、智能提示、代码格式化等功能
- vue devtool chrome 插件

## 多个页面（router）
    npm i vue-router 
  - 配置路由
  - 新建页面
    views/
  - 切换