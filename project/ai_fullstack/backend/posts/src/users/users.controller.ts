import {
    Body, // 获取请求体
    Controller,
    Post,
} from '@nestjs/common'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    // 依赖注入 this.usersService
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        // console.log(createUserDto);
        return this.usersService.register(createUserDto)
    }
}