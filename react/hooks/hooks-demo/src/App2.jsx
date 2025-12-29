import {
  useState
} from 'react'

export default function App2() {
  // 通过解包得到：
  // 一个状态变量 num，初始值为 1；一个更新 num 的函数 setNum
  // 函数内的普通变量在函数执行后就被销毁了，下次再执行的时候会就需要重新执行一遍
  // 但是num被Hooks机制“钩住”了（num变成状态state了），即使重新运行函数，num也不会重置，除非组件卸载了
  // hook useState 为程序带来了关键的响应式机制
  // 状态（state）是变化的数据，也是组件的核心
  // const [num, setNum] = useState(1);
  const [num, setNum] = useState(() => {
    // 状态初始值需要经过复杂 -> 配置一个函数来计算
    // 要求：函数必须为同步函数，异步的函数结果不确定，而状态一定要是确定的
    // 纯函数 指相同输入始终返回相同输出，且无副作用的函数
    const num1 = 1 + 2;
    const num2 = 2 + 3; 
    // 必须要有返回值
    return num1 + num2;
  });
  return (
    // <div onClick={() => setNum(num + 1)}>
    // 修改函数中可以直接传新的值，也可以传入一个函数，并且这个函数的参数是上一次的state
    <div onClick={() => setNum((prevNum) => {console.log(prevNum); return prevNum + 1})}>
      {num}
    </div>
  )
}