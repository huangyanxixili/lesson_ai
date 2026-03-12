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

- 源码分析第三阶段 fiber + Event Loop
    - 递归 render 的性能问题（爆栈）
        - VDOM 树比较巨大，例如：电商详情页的复杂组件树结构
        - 递归一旦开始，不能中断，直到 render 完成为止
        - JS 单线程，一直占据线程
            用户想要交互、动画、滚动条（更优先的任务）--> 卡顿、掉帧
    > 递归遍历虚拟 DOM、同步更新，但是一次大更新会长时间占用主线程，期间浏览器没法处理用户输入和动画（优先级更高的任务）→ 卡顿。
    - 解决方案 Fiber：React的工作机制
        - VDOM树 -> Fiber Tree -> render 
        - fiber的作用：**可中断、重新调度**
            fiber 节点是 element render 的工作单元（work unit）
                1. 将整个更新VDOM树的任务拆分成多个工作单元
                2. 每做完一个就检测是否有优先级更高的任务（如果有就让出控制权）
                3. 如果浏览器不忙（无优先任务）就继续完成更新任务
                4. 更新 work unit 指针，指向下一个工作单元（工作做完了指针就变成null）
    **消息队列 和 事件循环**
    - Event Loop（事件循环机制）
        1. 每个页面都有一个渲染进程，启动一个主线程，负责大量任务，而且还是单线程。进程内部包含 V8、JS引擎（JSX解析） 和 渲染引擎（页面渲染），多进程的通信（网络进程...）消息的方式
        2. 多少事要做：
            - 处理 DOM解析 和 HTML 生成 DOM树 
            - 计算样式、合并css规则与元素默认样式、确定每个DOM 节点最终的可视化样式属性值（CSSOM 树）
            - DOM Tree 和 CSSOM树 结合形成 渲染树（render Tree）
            - 处理布局，盒模型，BFC（弹性布局、浮动、定位）生成Layout Tree DOM节点 在屏幕的精确位置、尺寸等几何布局信息
            - 合并图层 
            - 渲染引擎 进行绘制
            - JS 执行 开始于一个 script 标签
                <script src="" type="module"></script>
                同步代码（尽快运行结束），异步代码（耗时的、未来的、事件的，用promise async await setTimeout setInterval addEventListener ...）
                - 消息机制 
                - Event Loop 
                    第一个宏任务 script
                    同步代码全部执行，碰到异步任务就放入宏任务队列（setTimeout... 每次只会取一个任务执行）或微任务队列（多个 promise 先进先出 一次情况所有的微任务）
    - 程序的运行模型
        - 主线程（单线程）模型
            按照 顺序执行 -> 执行完，线程会自动退出
            简单、高效，但会阻塞（通过异步来解决）
        - 在主线程过程中 有新的任务介入（优先级更高）
            I/O 读写文件、点击事件、键盘事件，就要采用事件循环机制
            > *掉帧：在一台60Hz屏幕上，如果主线程 在某1/60s（一帧）中被其他优先级更高任务占满，就会导致动画的这一帧无法被渲染，导致这一帧被“跳过”或“延迟”，也就是掉帧，在视觉上才会出现卡顿*
            单线程机制下，要去响应众多任务，设计出来的执行机制

            ```c++
            //GetInput
            //等待用户从键盘输入一个数字，并返回该输入的数字
            int GetInput(){
                int input_number = 0;
                cout << "请输入一个数:"; // 会让主线程一直阻塞在输入等待状态
                cin >> input_number;
                return input_number;
            }

            //主线程(Main Thread)
            void MainThread(){
                for(;;){
                    int first_num = GetInput()；
                    int second_num = GetInput()；
                    result_num = first_num + second_num;
                    print("最终计算的值为:%d",result_num)；
                }
            }
            ```
        - event loop 相对于之前的单线程有两个改变：
            1. 循环机制（Loop）一直检测有无新任务
            2. 引入了事件（event）
            Event + Loop = Event Loop 线程是活的

    - 处理其他线程发送过来的任务
        网络进程 消息机制 + Event Loop（JS执行机制）
    
    渲染主线程会频繁
        - 接收到来自于 I/O 线程的一些任务，接收到这些任务之后，渲染进程就需要着手处理，比如接收到资源加载完成的消息后，渲染进程就要着手进行 DOM 解析了
        - 接收到鼠标点击的消息后，渲染主线程就要开始执行相应的 JavaScript 脚本来处理该点击事件。

    优先级别 队列搞定
    宏任务队列 一次只会执行一个
    微任务队列 一次全清空