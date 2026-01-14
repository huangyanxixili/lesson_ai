console.log(add(1, 2));
function add(a, b) {
    // JS 是一门弱类型的动态语言，容易出错
    // JS 弱类型也有优势，简单易上手
    // 大型项目的时候，因为弱类型带来的代码质量问题 要99.999%不会出问题才是合格代码
    // JS 动态语言，不是静态语言，运行时候才发生bug
    // typescript 是 JS 的超级版，让 JS 变成强类型（类型限定），静态语言（bug在编译时期就不能通过）
    // 加法 拼接 都可以
    return a + b; // 二义性
}

const result = add(10, '5');
console.log(result);
