import {
    useParams, // 用于获取动态路由参数
} from 'react-router-dom'

export default function UserProfile() {
    const { id } = useParams(); // 获取路由参数对象 id
    return (
        <div>
            <h1>UserProfile {id}</h1>
        </div>
    )
}