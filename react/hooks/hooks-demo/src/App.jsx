import {
    useState,
    useEffect // 副作用
} from 'react';
import Demo from './components/Demo';

async function queryData() {
    const data = await new Promise(resolve => {
        setTimeout(() => {
            resolve(666);
        }, 2000);
    });
    return data;
}

export default function App() { 
    const [num, setNum] = useState(0);
    // console.log('yyy')
    // useEffect(() => {
    //     console.log('xxx')
    //     // 挂载后执行一次，类似于 vue生命周期onMounted
    //     queryData().then(data => {
    //         setNum(data);
    //     })
    // }, [1,2,3])

    // useEffect(() => {
    //     // 挂载时候会执行 onMounted
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
        // 每次都在新建定时器
        // 如何取消定时器？
        const timer = setInterval(() => {
            console.log(num);
        }, 1000)
        return () => {
            // 重新执行effect之前，会先清除每次的定时器
            // 如果不清除定时器，会导致内存泄露
            // useEffect return函数
            console.log('remove');
            clearInterval(timer);
        }
    }, [num]);
    return (
        <>
            <div onClick={() => setNum(prevNum => prevNum + 1)}>
                {num % 2 === 0 && <Demo /> }
            </div> 
        </>
        
    )
}