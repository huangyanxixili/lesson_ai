// v-dom 对象 element
const element = <h1 className="greeting">Hi</h1>

// 使用 npx babel input.js 转义后
// v-dom 对象 element
// const element = /*#__PURE__*/React.createElement(
//     "h1",                      // type 元素类型
//     { className: "greeting" }, // props 属性对象
//      "Hi"                      // children 子节点
// );