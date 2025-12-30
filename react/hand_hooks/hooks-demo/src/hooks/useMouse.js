// 封装响应式mouse业务
// UI 组件越简单越好 HTML + CSS 更好维护
// 复用 和组件一样 是团队开发的核心资产 
import {
    useState,
    useEffect
} from 'react'

export const useMouse = () => {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    useEffect(() => {
        const update = (e) => {
            // console.log(e.pageX, e.pageY)
            setX(e.pageX)
            setY(e.pageY)
        }
        window.addEventListener('mousemove', update);
        console.log('|||||||')
        // 把要向外暴露的状态和方法返回

        return () => {
            console.log('清除')
            window.removeEventListener('mousemove', update);
        }
    }, [])

    return {
        x,
        y,
    }
}