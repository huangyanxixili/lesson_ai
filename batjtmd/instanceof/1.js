function Animal() {

}

function Person() {
    
}

Person.prototype = new Animal();
const p = new Person();
// OOP instanceof 关键字
// 基于血缘关系
console.log(p instanceof Person)
console.log(p instanceof Animal)