# 星物种
- 公司
    - 方向  机器人AI 
        - 天使轮 -> 小公司，初创
        - A轮    -> 有价值的公司 
    - 薪资 
        - 发展中（A轮） 150-250 杭州的中等薪资
            没office 就最低，让公司给我们发office
            有office 就视目前已有的office 适当提升
    - 谈论远程
        - 先谈远程，能否先工作，5月份再去公司继续上班
    - 开发要求
        React + typescript 
    - 反问
        1. 前端团队规模（有没有人带） 
            0人 慎重
        2. 公司的开发流程，技术栈
    
## 浏览器的渲染机制
- 脑海中要有一张图

- 语言表达：
    1. 首先，浏览器拿到 URL 之后，会发起网络请求，开始下载 HTML 文件。HTML 是流式解析的，也就是边下载边解析。HTML解析器会把标签逐步解析成 DOM Tree，在解析过程中如果遇到 Link，style 等css请求，浏览器会发起 css 请求，并交给 css 解析器生成 CSSOM 树。
    2. 接着，如果在解析 HTML 的过程中遇到 JavaScript，默认情况下 JS 会堵塞 DOM 构建（document.title 修改节点）。浏览器会暂停 DOM 解析，交给 V8 引擎执行 JS，执行完之后再继续解析 HTML
    3. 然后，当 DOM tree 和 CSSOM tree 都构建完成后，合并成 Reader tree（渲染树）。渲染树只包含需要显示的节点，display 为 null 的节点不会进入渲染树。
    4. 再然后，进入 Layout（回流/重绘）阶段，浏览器会根据盒模型、位置、尺寸等信息，计算每个元素在页面（文档流）中的几何位置和大小，生成布局树。
    5. 然后是 Paint（绘制），浏览器会把每个元素的颜色、背景、阴影、边框等绘制出来。
    6. 最后进入 Composite（合并）阶段，浏览器会把页面拆成多个图层，比如 tranform、opacity、position:fixed、动画等元素可能单独成为合成层，然后交给 GPU 做图层合并，最终显示到屏幕上
- 总结：
    HTML 解析 
        -> DOM 树 + CSSOM 
        -> Render Tree 
        -> Layout 
        -> Paint 
        -> Layer 
        -> Composite

### HTML 优化
- 语义化标签，有利于SEO（搜索引擎优化），也利于代码维护，而不是通篇优化
- 合理使用 id/class，避免重复选择器，便于样式于脚本维护
- 懒加载 非首屏DOM/资源，图片懒加载，降低渲染压力。
- 避免频繁操作 DOM，可先缓存节点或用文档碎片批量更新
    document.createDocumentFragment();

### CSS 优化
- * 通配符，换成标签选择
- 小图片（icon）转 base64 内联在 CSS 或 HTML 中，减少 HTTP 请求；大资源仍然用外链避免 CSS 体积过大（base64会有体积膨胀）
- 抽离通用样式，做成公共类或公共组件，减少代码冗余（面向对象）
- 合理使用 css 变量（:root），统一主题样式，便于维护
- 避免使用 !important 最强优先级，特难维护
- 使用 tailwindcss 原子类开发，很少需要去手写样式
    - 通过 原子类css 组合样式，无需写 css
    - 原子类名语义化，减少命名成本
    - 团队风格统一，降低沟通成本
    - 按需编译，体积可控，适配响应式

### script 优化
- 放底部
- <script src="" defer></script> 
    <script src="" async></script> 
    都不会阻塞 DOM 树的渲染
    - defer 会在 DOM 下载完后去下载 
    - async 是异步下载，不阻塞 DOM 下载，但是下载后就执行（会打断 HTML 解析）
- 变量使用 let/const 减少全局变量污染
- 频繁的 DOM 操作先缓存节点，批量更新
- 函数拆分复用，避免冗长代码
- 异步逻辑使用 async/await，代替回调地狱

### 性能优化
- 减少回流、重绘
    回流一定会触发重绘
    回流需要计算几何位置和尺寸，代价非常高
- 触发方式：
    修改 width/height/margin/padding 
    修改 fontsize 
    DOM 插入 / 删除
    读取布局属性 
        el.offsetHeight 
        el.getBoundingClientRect() 元素相对视窗的关系



## GET 和 POST 的区别，以及一次 HTTP 请求包含哪些信息
- 核心区别：
    从 Restful HTTP 语义上来说，GET是获取资源，POST是提交数据/新增资源
- 数据传输方式上：
    GET 的参数一般放在 URL的 QueryString（查询字符串）里，且长度受限（2kb-8kb左右）
        /api/user?id=1&name=andrew
    POST 一般数据放在 Request Body（请求体）里
    > 加分：GET 不是不可以发送请求体，只是服务器和浏览器约定不用
- 安全性：
    GET/POST 都是明文传输，POST 相对安全一些，真正安全性取决于是否用 HTTPS
- 幂等性：
    - GET 理论上是幂等的：同一个请求发 N 次，结果应该一样，不改变服务器数据，适合做缓存。
    - POST 通常非幂等：发一次和发多次结果可能不同，比如创建订单、扣款等。
    > 加分：HTTP 是无状态的
- 缓存：
    GET 会缓存
    POST 一般不缓存
- 包含的信息：
    - 请求行 
        请求方法（GET/POST/PUT/PATCH/DELETE/OPTIONS/HEAD等） 
        请求路径
        HTTP 版本
    - 请求头
        Authorization：Token
        Cookie
        ContentType 等
    - 请求体
        一般出现在 POST/PUT/PATCH 请求中

## 为什么TCP需要三次握手
为了在连接建立前，让双方都确认 “自己和对方的 发送和接收能力” 都正常，避免历史报文造成错误连接。
1. 客户端 → 服务端（SYN）
2. 服务端 → 客户端（SYN + ACK）
3. 客户端 → 服务端（ACK）

开始的接收方在发送应答 ACK 消息的同时，可以发送 SYN 消息 
