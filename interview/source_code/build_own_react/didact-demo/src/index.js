// console.log('手搓react源码');
function createElement(type, props, ...children) {
    // console.log(type, props, children);
    // element 对象 
    return {
        type,
        props: {
            ...props,
            children: children.map(child => 
                typeof child === 'object' 
                ? child // 虚拟DOM 对象 element
                : createTextElement(child) // 退出条件 文本节点 
            )
        }
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

// 将 VDOM节点（element）按照它的 type 和 props，递归地转换成 真实DOM，挂到 container（根节点） 上
function render(element, container) {
    // console.log(element, container);
    const dom = 
        element.type === 'TEXT_ELEMENT'
        ? document.createTextNode('')
        : document.createElement(element.type);
    // 判断是否是 children 属性
    const isProperty = key => key !== "children";
    Object.keys(element.props)
        // 过滤 children 键（真实DOM上没有children属性），需要递归处理
        .filter(isProperty)
        .forEach(name => {
            // 将 props 里除了children的所有属性 挂载到 真实DOM 上
            // 等价于：dom.非children属性 = element.props.非children属性
            dom[name] = element.props[name];
        })
    // children 节点递归 
    element.props.children.forEach(child => render(child, dom));
    // 将创建好的 真实DOM节点（dom），挂载到父节点container（根节点）下
    container.appendChild(dom);
}

window.Didact = {
    createElement, // 创建虚拟DOM
    render, // 渲染虚拟DOM
}

// 给 Babel 看的 JSX 配置注释
/** @jsxRuntime classic */
/** @jsx Didact.createElement */
const element = (
    <div style="background: salmon">
        <h1>Hello</h1>
        <h2 style="text-align: right">from Didact</h2>
    </div>
)

const container = document.getElementById('root');
Didact.render(element, container);