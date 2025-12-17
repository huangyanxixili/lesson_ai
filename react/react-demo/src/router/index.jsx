import {
    Route, // 路由的实例
    Routes // 前端路由总管
} from 'react-router-dom';

import Home from '../pages/Home'; // 首页
import About from '../pages/About'; //关于页

// 也是一个组件（路由组件）
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/about" element={ <About /> } />
        </Routes>
    )
}