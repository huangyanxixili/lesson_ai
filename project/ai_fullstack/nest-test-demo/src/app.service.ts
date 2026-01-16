// 依赖注入 
import { Injectable } from '@nestjs/common'
// controller控制器 服务于路由（路由分发请求，controller接收）
// --> 接收 HTTP 请求、解析参数、校验基础信息 -->调用Service
// service服务类 业务逻辑处理，只面向数据 
// Injectable（类装饰器） 被注入 
// --> 自动创建AppService实例，并且在实例化AppController时，将AppService实例注入到构造函数的参数内
@Injectable()
export class AppService {
  getHello():string {
    return "你好yeah！！！"
  }
  getWelcome():string {
    return "欢迎来到nest测试项目"
  }
  handleLogin(username:string, password:string) {
    if (username === "admin" && password === "123456") {
      return {
        status: 200,
        message: "登录成功",
      }
    } else {
      return {
        status: 400,
        message: "登录失败",
      }
    }
  }
}