# Todos 任务清单 VUE开发思路

- 响应式数据驱动的页面开发
- v-if v-for v-model
    composition API
        @keydown.enter
        :class
        computed
        Vue 开发方式 简单、高效、好上手

- 传统做法
    先找到目标元素，然后对其进行修改（DOM）
- vue做法
    不需要思考页面元素怎么操作，而是思考数据是如何变化的
- v-指令
    - v-for 循环输出
    - v-if
    - v-show
    - v-bind
- computed 计算属性
  - 性能更好，依赖的数据变化时重新计算  