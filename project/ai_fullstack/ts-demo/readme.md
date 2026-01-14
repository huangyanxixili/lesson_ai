# TypeScript 数据类型

## 基本数据类型：
- number 数字类型
- string 字符串类型
- boolean 布尔类型
- null 空类型
- undefined 未定义类型
- symbol 标签类型
联合使用： `string | number` 联合作为变量全部类型

## 数组类型：
1. `number[]` 数组中只能是数字类型
2. `Array<number>` 用 `<T>` 泛式写法表示数组
3. `[number, string]` 元组类型，固定长度、固定数据类型顺序

## 枚举类型：
通过 `enum` 定义枚举类型，定义一个固定数量的常量值（借鉴了JAVA）
```typescript
enum Color {
    Red,   // 0
    Green, // 1
    Blue,  // 2
}
let c: Color = Color.Red; // 限定 c 只能是枚举类型中的值之一
```

## any 类型：放弃类型检查（慎用）
适合刚开始接触 TS、或者不熟悉某个第三方库的类型时应急
```typescript
let aa: any = 1; // 任意类型 救命稻草（放弃治疗、放弃类型约束）
aa = "11"
aa = {}
```
any 可表示“任意类型”：
  - 可以把任何值赋给它；
  - 它也可以赋给任何类型。

## unknown 类型：更安全的“未知类型”

```typescript
let bb: unknown = 1; // 未知类型 更安全
bb = 'b'; // 使用前做类型检测 
// bb.hello(); // 对象 未知类型可以接收任何类型，但是不能直接调用方法！ 
```
unknown ：也可以接收任何值（像 any 一样），但：
  - 不能直接 对它做属性访问、方法调用、运算等操作。
  - 使用**方法**之前必须先做类型判断，比如`typeof bb ==='string'`，才能调用方法

可以把这个看作为一个 **“更安全的 any”**，接受任何输入，但强制你在使用前检查类型。

## 对象类型：
1. 直接定义对象类型：`{ name: string, age: number, hometown: string }`，虽然简单，但是类型复用性差
2. 使用接口interface定义对象类型：
可复用的对象类型约束，声明任何被interface约束的对象都必须满足这里的结构
```typescript
interface Person {
    name: string;
    age?: number; // 可选属性，写不写无所谓
    readonly id: number; // 初始化时可以赋值，之后不能被修改
}
```

## 类型别名 type
自定义了一个 类型别名 ID
```typescript
type UserType = {
    name: String
    age: Number
    hobby?: string
}
const f: UserType = {
    name: '西西里',
    age: 18,
}
```