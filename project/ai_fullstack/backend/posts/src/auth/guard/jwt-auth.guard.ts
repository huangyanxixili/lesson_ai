import {
    Injectable
} from '@nestjs/common';
// nestjs 默认提供的路由守卫（guard），自动解析req Authorization
import { AuthGuard } from '@nestjs/passport';
// req header Authorization 
// 关注的是 access_token
//  @nestjs/jwt verify
// 类似 service ，依赖注入
@Injectable()
// 继承 AuthGuard 基类
export class JwtAuthGuard extends AuthGuard('jwt') {
    
}