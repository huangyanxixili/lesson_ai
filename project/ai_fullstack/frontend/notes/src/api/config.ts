import axios from 'axios';
import { useUserStore } from '@/store/useUserStore';

// 接口地址都是以/api开始
// axios.defaults.baseURL = 'http://douyin.com:5173/api'
// axios.defaults.baseURL = 'http://localhost:3000/api'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    // baseURL: 'http://localhost:5173/api',
})

// 请求拦截器
instance.interceptors.request.use(config => {
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

// refresh token + redo requests

// 全局的，标记是否正在刷新token
let isRefreshing = false;
// 请求队列，refresh在刷新中，其他并发的请求再去发送就没有意义（都是401）
// 将其他请求暂存在队列中，等refresh完成后，再带上新的token依次发送
let requestQueue: any[] = [];

// 响应拦截器
// axios api 请求大管家 关于请求的一切都会给我们
// data 只是其中的一项
instance.interceptors.response.use(res => { // 成功的响应
    console.log('///////')
    // if (res.status != 200) {
    //     console.log("出错了")
    //     return;
    // }
    return res.data
}, async (err) => { // 异常的响应
    // console.log(err, '响应异常');
    // 刷新token 
    const { 
        config, // 请求对象的配置(config)信息
        response // 
    } = err;
    // console.log(config, response, "?????");
    // _retry 刻意标记 是否是重试的请求，避免retry死循环（当_retry为true时，说明已经刷新过一次token了，但是仍然没用，就直接转跳到登录，避免死循环）
    if (response?.status == 401 && !config._retry) {
        // 如果在刷新中，把后续请求放到队列中
        if (isRefreshing) {
            // 异步，未来token refresh 后，再resolve
            return new Promise((resolve) => {
                requestQueue.push((token: string) => {
                    config.headers.Authorization = `Bearer ${token}`;
                    resolve(instance(config));
                });
            })
        }
        config._retry = true; // retry开关
        isRefreshing = true; // 标记正在刷新token

        try {
            // refresh
            const { refreshToken } = useUserStore.getState();
            if (refreshToken) {
                // 无感刷新token
                const { access_token, refresh_token } = await instance.post('/auth/refresh', {
                    refresh_token: refreshToken
                })
                // console.log(res, "???????????????????");
                useUserStore.setState({
                    accessToken: access_token,
                    refreshToken: refresh_token,
                    isLogin: true,
                });
                
                requestQueue.forEach((callback) => callback(access_token));
                requestQueue = [];

                // 当前请求
                config.headers.Authorization = `Bearer ${access_token}`;
                return instance(config);
            }
        } catch(err) {
            // 刷新token失败，跳转到登录页
            useUserStore.getState().logout(); 
            window.location.href='/login';
            return Promise.reject(err);
        } finally {
            isRefreshing = false;
        }
    }
    return Promise.reject(err);
})

export default instance