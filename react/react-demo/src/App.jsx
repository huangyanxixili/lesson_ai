import './App.css'
import  {
  // "/" HTML5支持的路由形式 更接近和后端路由 【现代化】 但低端浏览器不支持
  BrowserRouter as Router, 
  // "#" 路由形式之一（as 重命名一下）有点丑 【早期使用】
  // HashRouter as Router, 
  Link // 使用路由后 a 不能用了，Link组件代替，内部消化
} from 'react-router-dom';
import AppRoutes from './router'

function App() {
  return (
    // 路由接管一切
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/about" >About</Link>
          </li>
        </ul>
      </nav>
      <AppRoutes />
    </Router>
  )
}

export default App
