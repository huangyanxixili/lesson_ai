# 手写keep alive

- 缓存组件 keep alive
- 使用 css 的 display 切换显示
- 使用 map 缓存组件（es6 新增的数据结构）
    map 和 json 的核心区别：
       map的key可以超越string，用object作为key也可以
> 传统对象： key 只能是 string 或者 symbol，强制用object作为key，会被自动转换成字符串`[object Object]`
> Map强大：Map的key可以是任意值，包括对象、函数、DOM节点等（set + get）

- 考察手写组件 KeepAlive
   - 将 children 实现 keepalive
     Map
     所有组件都显示
   - props？
     active display:block
     display: none
   - Object.entries 就是把一个对象的键值对“拆”成由[key, value]组成的数组 
     二维数组 [[key1, valye1], [key2, value2]]