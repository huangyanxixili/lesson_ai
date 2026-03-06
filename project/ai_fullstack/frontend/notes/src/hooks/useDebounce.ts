// react 版本的防抖
// 每次事件触发，都把计时器清零，重新开始倒计时。只有在规定时间（如 500ms）内 没有再次触发 ，才会真正执行一次函数
import {
    useState,
    useEffect
} from 'react';

// 通用 hook
// T（泛型）接收类型的传参 
// value：防抖类型，dalay：毫秒级时间戳
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value); // 约束响应式状态类型
    // api 请求 由debouncedValue 负责
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        // 如果再次输入，handler timeout id 清除
        // 不输入，时间到了， 定时器执行？
        // 清理函数（新旧状态的清理） 再运行新的effect
        return () => { // 卸载，更新时都会触发
            clearTimeout(handler)
        } 
    }, [value, delay]);
    return debouncedValue;
}