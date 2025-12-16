// JS 是动态语言
var bar; // undefined 调用栈执行上下文里存放了
console.log(typeof bar);

bar = 12; // number
console.log(typeof bar);

bar = 'hello'; // string
console.log(typeof bar);

bar = true; // boolean
console.log(typeof bar);

bar = null; // null
console.log(typeof bar); // object JS设计的bug

bar = {name: '张三'}; // object
// Object.prototype.toString.call() 精准类型判断，能安全处理 null 和 undefined
console.log(typeof bar);

