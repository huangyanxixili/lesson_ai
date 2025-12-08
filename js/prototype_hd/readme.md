# 原型继承

- call 和 apply 方法
   - 函数的方法，可以指定函数运行时的 this 指向
   - 被指定的函数也立即执行了
   - 参数不同：
        第一个参数是 this 的指向对象，构造函数继承中 this 指向子类
       - call 方法：余下参数逐个传递 `.call(this, name, age)`
       - apply 方法：余下参数以数组形式传递 `.apply(this, [name, age])`

- 继承方法：
    1. 原型链继承
    ```js
    Cat.prototype = new Animal(); 
    Cat.prototype.constructor = Cat;
    ```

    2. 直接指向父类原型（有引用式赋值副作用）
    ```js
    Cat.prototype = Animal.prototype;
    Cat.prototype.constructor = Cat;
    ```

    3. 中介函数继承
    ```js
    function extend(Parent, Child) {
        var F = function() {};
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child; 
    }
    extend(Animal, Cat);
    ```

    4. 使用Object.create方法（ES5 新增）
    ```js
    Cat.prototype = Object.create(Animal.prototype);
    Cat.prototype.constructor = Cat;
    ```