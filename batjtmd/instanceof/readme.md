# 手写 instanceof

- instanceof 是啥？
   - 其他 OOP 语言：实例判断运算符（检查对象是否是某个构造函数的实例）
   - javascript：原型关系判断运算符
       - A instanceof B
           - A 的原型链上是否有 B 的原型  

- 原型和原型链
   - arr -> Array.prototype -> Object.prototype -> null
        `__proto__`: 指向原型对象（上一位的 .prototype），用于属性查找
        `constructor`: 指向构造函数本身，用于标识对象的创建者
        `prototype`： 构造函数的属性，指向原型对象（内置构造函数的 prototype 上通常有默认方法）
            子.__proto__ === 父.prototype
            父.prototype.constructor === 父
            子.__proto__.constructor === 父（通过原型链访问）

- 需求：
   - 在大型项目，多人协作的情况下
        搞不清楚对象上有哪些属性和方法
        通过 instanceof 来查找继承关系