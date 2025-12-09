# 手写 new

- new 实例运算符
- 实例化的过程
   - new 构造函数 原型式的面向对象
   - 从空对象开始
        let obj = {}
   - this -> 创建空对象，运行构造函数
        Object.call(obj)
   - 将空对象的__proto__ 指向 构造函数的原型对象
        obj.__proto__ = Object.prototype
   - 返回新对象
        return obj

## 类数组 Arguments
- 函数运行时候的参数对象
- JS 函数的参数也是动态的
    ```js
    function add() {
        let result = 0;
        for(let i = 0; i < arguments.length; i++) {
            result += arguments[i];
        }
        return result;
    }
    ```
- Arguments 是个 类数组
   - 与Array相同处：
       - 有长度属性 .length
       - 可以使用索引访问
   - 与Array不同处：
       - 不能使用数组方法 （.push .reduce 等）
       - .__proto__ 是Object 而非 Array
    
   - 如何变成真的数组
        
