import {
    useState,
    useEffect // 副作用
} from 'react';
import Demo from './components/Demo';

async function queryData() {
    // 同步创建一个Promise（承诺）对象
    // 其内部函数setTimeout在异步执行后调用 resolve(666)
    // Promise拿到resolve()的值666，状态从pending -> fulfilled
    // await 在此挂起，提取 Promise 的内部值 666 后，执行return
    const data = await new Promise(resolve => {
        setTimeout(() => {
            resolve(666);
        }, 2000);
    });
    return data;
}

export default function App() { 
    const [num, setNum] = useState(0);
    // 第一次挂载页面时执行组件函数，打印一次yyy
    // console.log('yyy')

    // // 1. 把 Promise 想成“取号排队的凭证”。你现在没有结果，但先拿到一个号牌（Promise）
    // // 2. .then 就是“登记回电”。你告诉柜台：等号叫到我（Promise完成）就给我打电话（回调函数）
    // // 3. 结果准备好时（resolve），系统按顺序通知你（在当前任务结束后的微任务阶段执行你登记的回调）

    // // 由于没有依赖项，挂载后只执行一次，类似于 vue生命周期onMounted
    // useEffect(() => {
    //     console.log('xxx')
    //     // 首帧渲染后执行useEffect时：打印xxx，然后调用queryData异步函数
    //     // 立刻接收到一个 pending 的 Promise，并登记 .then
    //     // 当接收到异步函数执行完后，promise变成fulfilled后
    //     // .then内部函数才被调用执行，此时.then会注册个新的promise后，并将接收的数据传递给执行内部函数
    //     // 执行完内部函数后.then返还一个新的promise传递给后续的.then
    //     // setNum(data) 触发重新渲染，使得组件函数再次执行，UI显示666
    //     // 由于setNum触发了状态改变，而状态更新驱动View更新，从而导致再次打印yyy
    //     queryData().then(data => {
    //         setNum(data);
    //     })

    //     // 时间线：
    //     // - 首渲染：组件函数执行，打印 yyy，UI显示 0
    //     // - 提交后：effect 运行，打印 xxx，调用 queryData 并登记 then
    //     // - 2秒后：定时器回调执行 resolve(666)
    //     // - 微任务阶段：then 的回调拿到 666，调用 setNum
    //     // - 重渲染：组件函数再次执行，UI显示 666，再次打印 yyy
    // }, [])

    // useEffect(() => {
    //     // 挂载时候会执行    onMounted
    //     // 依赖更新时也会执行 onUpdated
    //     console.log(num, 'zzz');
    // }, [num])

    // 如果不传依赖项，每次渲染后（onMounted）和状态更新（onUpdated）时都会执行
    // useEffect(() => {
    //     console.log('ddd');
    // }) // 副作用在页面渲染后再执行
    // console.log('yyy');

    useEffect(() => {
        console.log('effect');
        // 定时器副作用
        // 每次执行useEffect都在新建定时器
        // 如何取消定时器？
        const timer = setInterval(() => {
            console.log(num);
        }, 1000)
        return () => {
            // 重新执行effect之前，会先调用上次effect返还的清理函数
            // 从而清除上一次的定时器
            // 如果不清除定时器，会导致内存泄露
            // useEffect return函数
            console.log('remove');
            clearInterval(timer);
        }
    }, [num]);
    return (
        <>
            <div onClick={() => setNum(prevNum => prevNum + 1)}>
                {/* {num} */}
                {num % 2 === 0 && <Demo /> }
            </div> 
        </>
        
    )
}