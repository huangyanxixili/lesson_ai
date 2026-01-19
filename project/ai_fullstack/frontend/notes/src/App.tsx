import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant="link">金手指</Button>
      <Button variant="destructive">银手指</Button>
    </>
  )
}

export default App
