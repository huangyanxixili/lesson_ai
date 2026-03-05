import { Divide } from 'lucide-react';
/* 导入 路由懒加载模块 */
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
import { AliveScope } from 'react-activation' // 存放 缓存的KeepAlive组件

const Home = lazy(() => import('@/components/KeepAliveHome'));
const Mine = lazy(() => import('@/pages/Mine'));
const Login = lazy(() => import('@/pages/Login'));
const Chat = lazy(() => import('@/pages/Chat'));
const Order = lazy(() => import('@/pages/Order'));

const PostLayout = lazy(() => import('@/layouts/PostLayout'));
const PostDetail = lazy(() => import('@/pages/post'));
const Search = lazy(() => import('@/pages/Search'));


export default function RouterConfig({children}: {children?: React.ReactNode}) {
    return (
        <Router>
            {/* 拥有了 keep alive 能力 */}
            <AliveScope>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/search" element={<Search />} />

                        {/* Post route 模块 */}
                        <Route path="/post"  element={<PostLayout />} >
                            <Route path=":id" element={<PostDetail />} />
                            {/* <Route /> */}
                        </Route>
                        {/* 布局组件 */}
                        <Route path="/" element={<MainLayout />}>
                            <Route path="" element={<Home />} />
                            <Route path="mine" element={<Mine />} />
                            <Route path="order" element={<Order />} />
                        </Route>
                    </Routes>
                </Suspense>
            </AliveScope>
            {children}
        </Router>
    )
}