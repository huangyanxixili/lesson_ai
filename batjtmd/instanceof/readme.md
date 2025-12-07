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


## 继承的方式
本质上就是将父类的属性和方法，子类也能拿到
- 构造函数绑定继承（用apply/call） 
    ``` js
    function 子() {
        父.apply(this) 
        // 父.this = 子.this，那么父函数在使用 this 时就是指向子函数
    }
    ```
- prototype模式
   - 父类的实例作为子类的原型
   - 子类原型的constructor要再指回子类 
- 利用空对象作为中介

- 最佳方式：
    ```js
    // 父类
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.sayName = function() {
        console.log("I'm " + this.name);
    };

    // 子类
    function Dog(name, breed) {
    // ✅ 第一步：借用父类构造函数（绑定 this）
        Animal.call(this, name); // 继承实例属性
        this.breed = breed;
    }

    // ✅ 第二步：设置原型链（继承方法）
    Dog.prototype = Object.create(Animal.prototype); // 关键！
    Dog.prototype.constructor = Dog; // 修复 constructor

    // 子类自己的方法
    Dog.prototype.bark = function() {
        console.log("Woof!");
    };
    ```