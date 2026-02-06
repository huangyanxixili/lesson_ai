import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

// 接口地址都是以/api开始
// axios.defaults.baseURL = 'http://douyin.com:5173/api'
axios.defaults.baseURL = 'http://localhost:3000/api'

// 请求拦截器
axios.interceptors.request.use(config => {
    // console.log("||||||||||", config)
    const token = useUserStore.getState().accessToken;
    // 1. 为什么不能直接用 useUserStore() ？
    // useUserStore 是一个 Hook。而React的铁律：Hooks只能在React组件内部或其他Hook内部调用。
    // 而这里的 axios拦截器只是一个普通的js函数，所以不能直接使用 `const { token } = useUserStore()`
    
    // 2. 为什么 useUserStore.getState() 可以？
    // 这是 Zustand 内很多纯JS逻辑也要使用状态，所以提供了一个 后门API：useUserStore.getState()
    // 1. 身份：它不是 Hook，它就是一个普通的函数方法
    // 2. 能力：它能直接伸进仓库里，把当前的 State 快照拿出来
    // 3. 特权：可以在任何地方调用

    // console.log(token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

// 响应拦截器
// axios api 请求大管家 关于请求的一切都会给我们
// data 只是其中的一项
axios.interceptors.response.use(res => {
    console.log('///////')
    if (res.status != 200) {
        console.log("出错了")
        return;
    }
    return res.data
})

export default axios