import {
    Controller,
    Get,
    Post,
    Query,
    Body,
    UseGuards,
    Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
// 约束查询参数
import { PostQueryDto } from './dto/post-query.dto';
// auth 模块
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';


@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {

    }
    // HTTP 接口入口
    @Get()
    async getPosts(@Query() query: PostQueryDto) {
        console.log(query)
        return this.postsService.findAll(query);
    }

    // 发布文章的处理函数
    // restful 
    // posts 新增文章post
    @Post()
    @UseGuards(JwtAuthGuard) // 路由守卫
    createPost(
        @Body('title') title: string,
        @Body('content') content: string,
        @Req() req
    ) {
        return {
            title,
            content,
        }
    }
}