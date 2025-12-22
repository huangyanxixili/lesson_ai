const cache = {}; // 用空间换时间
function fib(n) {
    // in 操作符 检查对象及其原型链上是否存在键名 n
    if (n in cache) {
        return cache[n];
    }
    if (n <= 1) {
        cache[n] = n;
        return n;
    }
    const result = fib(n-1) + fib(n-2);
    cache[n] = result;
    return result;
}