function foo() {
    var a = {name: '张三'}; // 引用式赋值
    var b = a; // 引用式拷贝
    a.name = '李四';
    console.log(a); // { name: '李四' }
    console.log(b); // { name: '李四' }
}
foo();