# React 
MVVM 现代前端框架 
组件化、响应式、JSX、虚拟DOM、Fiber机制...

- React 的底层原理
    最好的方式--手写 Mini React
    React 只是框架名字，搭建Didact，统一的命名空间（将对外暴露的能力，都挂载在一个统一的对象上）

- 搭建源码开发项目
   - react-scripts 内置 vite 
- JSX
    JSX 是在JavaScript里面直接写html标签的语法糖
    - JSX 
        -> render function：JSX 由 Babel 等工具被编译成多次 createElement 嵌套调用，并返还一个VDOM
        -> 双vdom（虚拟DOM树）：要做到“最小代价更新”，通过对比形成差异补丁，只对真实DOM应用这些补丁，而不是每次更新都要推倒之前的DOM
        -> 真实DOM（diff + patch）
    - 优势：
        1. 直观且声明式
            在.vue中是三段式的，而jsx是和数据逻辑连在一起的，通过jsx直接可以看到最终输出的DOM结构
            ```JSX
            let user = (<div>
                <h2>用户列表</h2>
                {users.map(user => <p key={user.id}>{user.name}</p>)}
            </div>)
            ```

- 源码分析第一阶段 The CreateElement Function 
    - jsx 由 babel 转义成 React.createElement 
    - React.createElement 会接收到 type props children 这三个参数
    - createElement 返还的内容类似一个节点，这些节点对象就构成 VDOM 的节点之一(element)
    - 递归 叶子节点，文本节点为了统一处理（render）也返回 VDOM

    得到了 VDOM（任意节点如下）
        {
            type: 'TEXT_ELEMENT | NodeName | ComponentFunction',
            props: {
                ...props,
                children: []
            }
        }

    开发者只需关注数据业务，DOM 打理由 React 帮我们做了（重绘重排 render）

- 源码分析第二阶段 render 函数
    - 接收 虚拟DOM（element）和container（根节点 -> 真实DOM）
    - 创建节点 Node | TextNode
    - isProperty 判断 children 之外的都是
    - 添加属性
    - 挂载
