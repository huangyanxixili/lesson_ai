import {
    createContext,
    // useContext // hooks 
} from 'react';
// 在顶层建一个“信号塔”
// 只要在塔覆盖范围内，任何组件（不管埋得多深）都可以直接接收信号
// 完全不需要中间组件插手。

import Page from './views/Page.jsx'

// 1. 建塔 (Create Context) ：定义一个信号频道。
// 实例化一个Context对象作为数据容器，内置两个组件：Provider 和 Consumer（弃用）
export const UserContext = createContext(null);
// 可以有多次 export 导出，但是 export default 只能有一个
export default function App() {
    const user = {
        name: 'Andrew',
    }
    return (
        // 2. 发射（Provider）:在 App 里广播数据
        // context（数据容器） 提供给Page 组件树共享 value --> context里面的值
        // 使用Context对象内置的 Provider组件（数据提供者）
        <UserContext.Provider value={user}>
            <Page />
        </UserContext.Provider>
    )
}