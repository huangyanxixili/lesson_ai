import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {
    PrismaService
} from '../prisma/prisma.service'
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
// nestjs 内置的jwt模块
// 需要安装的依赖：@nestjs/jwt（性能比较好，插件式）企业级 同时保持 小巧
// 注入的方式 注入到Auth模块中
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const { name, password } = loginDto;
        const user = await this.prisma.user.findUnique({
            where: {
                name
            }
        })
        // password 对比
        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('用户名或密码错误')
        }

        // 颁发token
        // 模块化分离，专注业务
        const tokens = await this.generateTokens(user.id.toString(), user.name);
        return {
            ...tokens,
            user: {
                id: user.id.toString(),
                name: user.name,
            }
        }
    }

    async refreshToken(rt: string) {
        try {
            // decode 解码 
            const payload = await this.jwtService.verifyAsync(rt, { // verify 验证
                secret: process.env.TOKEN_SECRET,
            });
            console.log(payload, "??????????");
            return this.generateTokens(payload.sub, payload.name);
        } catch(e) {
            throw new UnauthorizedException('Refresh Token 已失效，请重新登录')
        }
    }

    // OOP（面向对象编程）private 方法 只在当前类中使用，复杂度剥离
    private async generateTokens(id: string, name: string) {
        // 用户信息关键 JSON Object
        // 马上要用于签发token，发令枪先装填弹药（payload），就像生成token，要先准备用户对象一样
        const payload = {
            sub: id, // subject 主题 JWT中规定的关键字段
            name,
        };

        // 签发token
        const [at, rt] = await Promise.all([
            // 异步颁发两次token（signAsync）
            // access_token（AT），用于日常访问，防止黑客攻击
            this.jwtService.signAsync(payload, {
                expiresIn: '15m', // 有效期15分钟 更安全（被中间人攻击）
                secret: process.env.TOKEN_SECRET,
            }),
            // refresh_token（RT），用于刷新access_token，提升用户体验（不能每15分钟就让用户重新登录）
            // 当AT过期时，只要RT没过期，就重新颁发新的AT和RT，并且用户只要长token时限内活跃，就无限续杯
            this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.TOKEN_SECRET,
            })
        ])
        return {
            access_token: at,
            refresh_token: rt,
        }
    }
}