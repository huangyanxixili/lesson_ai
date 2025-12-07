function Person(name) {
  this.name = name;
  this.sayHello = function() {
      console.log("你好");
  };
}

const p = new Person("Alice");
console.log(p.hasOwnProperty('sayHello'));  // true - 是 p 自己的属性
console.log(Person.prototype.sayHello);   // undefined - prototype 上没有