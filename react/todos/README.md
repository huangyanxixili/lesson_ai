# React Todos

- react + stylus + vite 

- 父子组件通信
- 子父组件通信
    通过父组件传递的自定义事件上报、修改
- 兄弟组件**通信**（间接通过父组件 + 响应式）
    TodoInput TodoList TodoStats
    共享数据：todos[] useState 
    父组件 
        负责持有数据 管理数据 再通过props传递给子组件
        还可以将修改数据的方法传给子组件
    子组件
        不可以直接修改数据，只能借助父组件提供的方法来实现
        提交修改的请求
    
    统一、正确的更新

- 亮点
    - 用 useEffect 监听todos变化，保存到本地存储
