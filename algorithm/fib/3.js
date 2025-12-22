// cache 闭包到函数中 封装私有变量，防止污染
// IIFE
const fib = (function() {
    // 闭包 装载自由变量
    const cache = {};
    return function(n) {
        if (n in cache) {
            return cache[n];
        }
        if(n <= 1) {
            cache[n] = n;
            return n;
        }
        cache[n] = fib(n-1) + fib(n-2);
        return cache[n];
    }
}) ()

console.log(fib(100));