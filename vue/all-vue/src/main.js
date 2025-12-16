import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'


// 现代前端应用
// 组件化、响应式...
// 和 DOM 操作say byebye
const app = createApp(App)
app
    .use(router)
// 挂载到 #app 上
    .mount('#app')
