import { 
    Link,
    useMatch,
    useResolvedPath,
} from "react-router-dom";

function Navigation() {
  const isActive = (to) => {
    const resolvePath = useResolvedPath(to); // 将传入的路径 to 解析为一个 URL 对象
    console.log(resolvePath);
    // 匹配规则
    const match = useMatch({
        // 与浏览器当前的URL对比 是否匹配
        path: resolvePath.pathname,
        // 匹配模式
        // true：精准匹配，只有URL相同才能匹配
        // false： 前缀匹配，/about也会匹配 /，因为前缀中有/ 
        end: true
    })
    // console.log(resolvePath, '////////')
    return match ? 'active' : '';
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={isActive('/')}>Home</Link>
        </li>
        <li>
          <Link to="/about" className={isActive('/about')}>About</Link>
        </li>
        <li>
          <Link to="/products" className={isActive('/products')}>Product</Link>
        </li>
        <li>
          <Link to="/products/new" className={isActive('/products/new')}>Product New</Link>
        </li>
        <li>
          <Link to="/products/123" className={isActive('/products/123')}>Product Detail</Link>
        </li>
        <li>
          <Link to="/pay" className={isActive('/pay')}>Pay</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation 
