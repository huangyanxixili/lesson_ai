// 封装git diff 得到LLM 给我们的规范的commit message
import {
    useState,
    useEffect
} from 'react'
import { chat } from '../api/index';

// use 开头，可以封装响应式业务，副作用等，从组件内剥离
// 组件只负责单一的UI 
export const useGitDiff = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            // if (!diff) return;
            setLoading(true);
            const { data } = await chat('你好');
            setContent(data.reply);
            setLoading(false);
        })()
    }, [])
    return [
        loading, // 加载中...
        content // commit message 内容
    ]
}