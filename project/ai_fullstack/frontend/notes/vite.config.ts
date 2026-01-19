import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
// node 需要单独添加类型声明文件
import path from 'path' // node 的内置模块，专门用来处理文件路径

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  "resolve": {
    alias: {
      // __dirname node的超级变量，代表项目的根目录
      // 项目里的 import '@/...' = import 'src/...'
      '@': path.resolve(__dirname, 'src'), 
    }
  }
})
