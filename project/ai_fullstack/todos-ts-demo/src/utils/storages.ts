// T 参数类型 类型参数
export function getStorage<T>(key:string, defaultValue: T): T {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
}
// getStorage 为泛型函数：想要什么类型的值（通过给一个 defaultValue）
// 就从存储里取对应 key 的值，并且 保证返回值类型跟 defaultValue 一致
// T 用来约束 defaultValue 与返回值的类型一致，并让 getStorage 成为一个可以复用在任意类型上的泛型函数

export function setStorage<T>(key:string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}