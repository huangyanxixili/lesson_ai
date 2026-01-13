import {
  Link,
  BrowserRouter as Router, // html5 history
  // HashRouter, // hash history
} from 'react-router-dom'
import Navigation from './components/Navigation.jsx'
import RouterConfig from './router/index.jsx';

export default function App() {
  return (
    <Router>
      <Navigation />
      <RouterConfig />
    </Router>
  );
  // 如果 Navigation 组件（里面有<Link>）被移到了 <Router> 标签的外面，就会发生报错
  // 因为 <Link> 只能在 <Router> 内使用
}
