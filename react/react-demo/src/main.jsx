// 严格模式 会执行俩次 --> 一次执行，一次测试（review）
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.styl' // 全局样式 stylus
// vite 帮我们翻译stylus 为 css
import App from './App.jsx' // 引入了组件 

// 将 App 组件挂载在 root 元素上 渲染render
createRoot(document.getElementById('root')).render(
  // 严格模式 <StrictMode>
  // 函数组件的名字 类html标签 -> 但是是自定义组件
  <App /> // JSX
)
