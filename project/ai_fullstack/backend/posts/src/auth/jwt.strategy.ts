// AuthGuard的工作原理

import { Injectable } from "@nestjs/common";
// 一个抽象基类，将Possport中的认证策略（Strategy）适配为nestjs的可注入服务（Injectable）
import { PassportStrategy } from "@nestjs/passport";
// 身份验证策略选择 jwt
import { Strategy, ExtractJwt } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            // 定义 Token 的提取方式，Bearer前缀的Authorization字段
            // Authorization: Bearer <你的JWT字符串>
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // 不是直接调用，PassportStrategy(Strategy) 封装
            // 
            ignoreExpiration: false,
            // 自动化去做（用什么密钥来验证 Token 的真伪）
            secretOrKey: process.env.TOKEN_SECRET || ""
        })
    }
    // JWT 用户对象
    // 需要重写方法，实现定制化返回
    async validate(payload) {
        // console.log(payload);
        return {
            id: payload.sub,
            name: payload.name,
        }
    }
}