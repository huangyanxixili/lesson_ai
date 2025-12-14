# vue3 流式输出 demo

## 初始化项目
- npm init vite
   - vite 是最近最优秀的前端脚手架
        做项目前的基础建设
   - init 初始化
- 选择
   - Vue 3
   - JavaScript
- 生成项目模板
    src/ 开发目录 主要代码在这

- vue 基础语法
    .vue 后缀文件
    App.vue 根组件
        script 脚本
        template 模板
        style 样式

- 响应式数据
    变量 -> 数据 -> 响应式对象 （api: ref）
    聚焦于业务，不用去写 DOM API
       - JS早期的命令式编程：监听事件，在将变量值加一，获得DOM节点，修改DOM节点内容（机械）
       - vue 聚焦于业务：ref响应式的概念，模板需要消费响应式数据`{{count}}`
            ```js
            let count = ref(0)
            count.value = 100;
            ```
       - 模板自动更新 