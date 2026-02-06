import {
    Module,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

// 设计模式 面向对象企业级别开发 经验总结
@Module({
    imports: [JwtModule.register({
        secret: process.env.TOKEN_SECRET,
    })],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {

}