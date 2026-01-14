let a:number = 1;
// a = '11';
let b:string = 'hello'
let c:boolean = true;
let d:null = null;
let e:undefined = undefined;
let arr:number[] = [1];
let user:[number, string] = [1, 'Tom'];
// <string>泛型 类型的传参 T
// Array<T>
let arr2: Array<string> = ['a', 'b'];

// ts 借鉴了 java 
// 枚举类型
enum Status {
    Pending, // 0
    Success, // 1
    Failed   // 2
}
let s:Status = Status.Pending;
s = Status.Success;
console.log(s); // 1

// ts 初学，先用 any 入门
let aa:any = 1; // 任意类型 救命稻草（放弃治疗、放弃类型约束）
// let aa = 1 // 类型的推导为 number
aa = "11"
aa = {}

let bb:unknown = 1; // 未知类型 更安全
bb = 'b'; // 使用前做类型检测 
// bb.hello(); // 对象 未知类型可以接收任何类型，但是不能直接调用方法！ 

let user2:{ name:string, age:number, hometown:string } = {
    name: '坤生',
    age: 18,
    hometown: '丰城',
}

// 接口 约定对象包含的 哪些属性和方法
interface User {
    name: string;
    age: number;
    readonly id: number; // 只读属性，初始化后不能修改
    hobby?: string
}

const u:User = {
    id: 1,
    name: "远志",
    age: 19,
    hobby: '打瓦'
}
u.name = "坤生";
// u.id = 1111; readonly 不允许修改

type ID = string | number; //自定义类型 
let num:ID = 111;

type UserType = {
    name: String
    age: Number
    hobby?: string
}

const f: UserType = {
    name: '西西里',
    age: 18, 
}