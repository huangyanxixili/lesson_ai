import { createRoot } from 'react-dom/client'
import RouterConfig from '@/router'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <RouterConfig>
    <App />
  </RouterConfig>,
)
