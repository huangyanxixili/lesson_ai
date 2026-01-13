import {
  lazy, // 懒加载组件
  Suspense, // 用于包裹懒加载的组件
} from "react";
import {
    Navigate, // 重定向
    Routes, // 一组路由
    Route // 单个路由
} from "react-router-dom"

import LoadingFallback from '../components/LoadingFallback/index.jsx';

// import Home from './pages/Home'
// 分享链接进入，就无需加载home路由
const Home = lazy(() => import("../pages/Home"));
// import About from './pages/About'
const About = lazy(() => import("../pages/About")); // 懒加载 About组件
const UserProfile = lazy(() => import("../pages/UserProfile")); // 懒加载 UserProfile组件
const Product = lazy(() => import("../pages/product"));
const ProductDetail = lazy(() => import("../pages/product/ProductDetail"));
const NewProduct = lazy(() => import("../pages/product/NewProduct.jsx"));
const Login = lazy(() => import("../pages/Login"));
const ProtectRoute = lazy(() => import("../components/ProtectRoute"));
const Pay = lazy(() => import("../pages/Pay"));
const NotFound = lazy(() => import("../pages/NotFound"));
const NewPath = lazy(() => import("../pages/NewPath"));

export default function RouterConfig() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* 动态路由 http(s)://www.juejin.on/user/123?keyword=123#/about
              协议 :// domain/path/:params?queryString
          */}
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/products" element={<Product />}>
          <Route path=":productId" element={<ProductDetail />} />
          <Route path="new" element={<NewProduct />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/old-path" element={<Navigate to="/new-path" replace />} />
        <Route path="/new-path" element={<NewPath />} />
        {/* 鉴权路由 */}
        <Route path="/pay" element={
            <ProtectRoute>
              <Pay />
            </ProtectRoute>
          }>    
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
