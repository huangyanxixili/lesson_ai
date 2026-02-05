import {
    Injectable,
    BadRequestException, // 错误处理 "HTTP 400 Bad Request"（请求错误）
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
    // 连接数据库操作接口 this.prisma 
    constructor(private prisma: PrismaService) {}

    async register(createUserDto: CreateUserDto) {
        const { name, password } = createUserDto;
        // findUnique 用来查具有@unique属性的数据，并返还对象（没找到就返还null）
        const existingUser = await this.prisma.user.findUnique({
            where: {
                name
            }
        })
        if (existingUser) {
            // throw 抛出 BadRequestException 异常
            // nestjs 会捕获，并返回给用户错误信息
            throw new BadRequestException("用户名已存在")
        }

        // 10 加密算法的强度
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword, hashedPassword.length)
        // console.log(await bcrypt.hash('123456', 10));
        // console.log(await bcrypt.compare())

        const user = await this.prisma.user.create({
            data: {
                name,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true
            }
        })
        return user    
    }

    
}