import { useContext } from 'react';
import {
    UserContext
} from '../App'

export default function UserInfo() {
    // console.log(UserContext)
    // 3. 接收 (useContext) ：在需要数据的组件里直接接收。
    const user = useContext(UserContext);
    return (
        <div>
            { user.name }
        </div>
    )
}