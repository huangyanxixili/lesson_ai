import {
  useState,
  useEffect
} from 'react';
import KeepAlive from './components/KeepAlive';

// 组件大写 用于区分原生的HTML标签
const Counter = ({ name }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`${name}组件挂载`);
    return () => {
      console.log(`${name}组件卸载`);
    }
  }, [name])
  return (
    <div style={{padding: '20px', border: '1px solid #ccc'}}>
      <h3>{name}视图</h3>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>加一</button>
    </div>
  )
}

const App = () => {
  const [activeTab, setActiveTab] = useState('A');

  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <button onClick={() => setActiveTab('A')}>显示A组件</button>
        <button onClick={() => setActiveTab('B')}>显示B组件</button>
      </div>
      {/* children 提升组件的定制能力 */}
      <KeepAlive activeId={activeTab}>
        {activeTab === 'A' ? <Counter name="A" /> : <Counter name="B" />}
      </KeepAlive>
    </div>
  )
}

export default App