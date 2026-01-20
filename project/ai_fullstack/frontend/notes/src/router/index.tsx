/* 导入 路由懒加载模块 */
import { Divide } from 'lucide-react';
import {
    Suspense,
    lazy,
} from 'react'
/* 导入 路由模块 */
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom'
import Loading from '@/components/Loading'
import MainLayout from '@/layouts/MainLayout'

const Home = lazy(() => import('@/pages/Home'));
const Mine = lazy(() => import('@/pages/Mine'));
const Login = lazy(() => import('@/pages/Login'));
const Chat = lazy(() => import('@/pages/Chat'));
const Order = lazy(() => import('@/pages/Order'));


export default function RouterConfig({children}: {children?: React.ReactNode}) {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* 布局组件 */}
                    <Route path="/" element={<MainLayout />}>
                        <Route path="" element={<Home />} />
                        <Route path="mine" element={<Mine />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="order" element={<Order />} />
                    </Route>
                </Routes>
            </Suspense>
            {children}
        </Router>
    )
}