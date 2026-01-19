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

export default function RouterConfig() {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    {/* 布局组件 */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/mine" element={<Mine />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    )
}