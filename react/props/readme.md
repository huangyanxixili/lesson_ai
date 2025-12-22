# props 

- state 改变的数据 自由的
- props 传递的数据 （组件传递数据的核心机制）

## 组件 components
- 拼乐高积木一样，把页面拼出来
- 开发任务的最小单元：组件
   - 组件可以封装，一般放在 components 目录下
       - pages 页面级别组件
   - 复用
         组件类 
   - 协作开发
   - 组件可以嵌套
         父子组件
         App.jsx      父组件
         Greeting.jsx 子组件
       - 组件之间就会有数据的传递

## 组件通信
- 父组件一般负责 持有数据   useState（私有数据）
- 子组件 可以接收父组件传递的 props （神圣不可修改）
  - function 的JS，通过参数传递 props 参数对象  