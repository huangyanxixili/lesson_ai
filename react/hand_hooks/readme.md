# hooks
- 是一种函数编程思想
  use开头 封装 vue/react 组件状态和生命周期，用起来非常方便 
   - react 内置的
   - react 自定义的hooks

## 自定义hooks案例
mousemove 事件 响应式监听鼠标的位置

- 内存泄漏
组件卸载时，需清除事件监听/定时器，否则会导致内存泄漏
不会因为函数组件卸载自动销毁，useEffect的return函数来销毁