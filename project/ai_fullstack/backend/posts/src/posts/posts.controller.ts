import {
    Controller,
    Get,
    Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
// 约束查询参数
import { PostQueryDto } from './dto/post-query.dto';

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
}