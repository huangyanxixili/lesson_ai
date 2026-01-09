import {
  useEffect,
} from 'react';
import { useGitDiff } from './hooks/useGitDiff.js';

export default function App() {
  // useEffect(() => {
  //   // fetch('http://localhost:3000/chat', {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   //   body: JSON.stringify({
  //   //     message: '你好',
  //   //   })
  //   // })
  //   // .then(res => res.json())
  //   // .then(data => {
  //   //   console.log(data);
  //   // })

  //   // 调用api模块中的chat函数
    
  //   (async () => {
  //     const res = await chat('你好');
  //     console.log(res.data);
  //   })()
  // }, [])

  const [loading, content] = useGitDiff();

  return (
    <div className="flex">
      {loading ? '加载中...' : content}
    </div>
  )
}

