import { 
    Injectable 
} from '@nestjs/common'; // 依赖注入
import { PostQueryDto } from './dto/post-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {

    }

    async findAll(query: PostQueryDto) {
        const total = await this.prisma.post.count();
        console.log(total, "--------------")
        return {
            items: []
        }
    }
}