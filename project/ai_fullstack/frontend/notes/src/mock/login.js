import jwt from 'jsonwebtoken'; // 签发token，验证token

const secret = "bld1235wasd!"; // 安全

export default [
    {
        // restful 一切皆资源
        url: '/api/auth/login',
        method: 'post',
        timeout: 2000, // 模拟延迟 2s
        response: (req, res) => {
            let { name, password } = req.body;
            name = name.trim(); // 去掉首尾空格
            password = password.trim();
            console.log(name, password, '?????');

            if (name === '' || password === '') {
                return {
                    code: 400, // Bad Request 客户端请求错误
                    message: '用户名或密码不能为空',
                }
            }
            if (name !== 'admin' || password !== '123456') {
                return {
                    code: 401, // unauthorized 未授权
                    message: '用户名或密码错误',
                }
            }

            const token = jwt.sign({
                user: { // json 对象
                    id: 1,
                    name: 'admin',
                    avatar: 'https://img-s.msn.cn/tenant/amp/entityid/AA1UIzXy.img?w=612&h=375&m=6'
                }
                // 加密
            }, secret, {
                expiresIn: 86400*7, // token有效时间 7天
            })

            console.log(token, '?????');
            return {
                token,
                user: {
                    id: 1,
                    name: "admin",
                    avatar: "https://img-s.msn.cn/tenant/amp/entityid/AA1UIzXy.img?w=612&h=375&m=6"
                }
            }
        }      
    },
    {
        url: '/api/auth/check',
        method: 'get',
        response: (req, res) => {
            const token = req.headers['authorization'].split(" ")[1];
            console.log(token);
        }
    }
]
