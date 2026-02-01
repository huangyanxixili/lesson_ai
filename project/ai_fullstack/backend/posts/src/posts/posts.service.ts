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
        // const total = await this.prisma.post.count();
        // console.log(total, "--------------")
        const { page, limit } = query;
        // 分页的游标
        const skip = ( ((page || 1) - 1) * (limit || 10) );
        const [total, posts] = await Promise.all([ // 并发执行
            this.prisma.post.count(),
            this.prisma.post.findMany({
                skip, // 跳过
                take: limit, //拿出多少数据
                orderBy: { id: 'desc' }, // 倒序
                include: { // 关系型数据（关联）
                    user: {
                        select: { // 只要哪些字段   
                            id: true,
                            name: true,
                            avatars: {
                                select: {
                                    filename: true,
                                    // take: 1,
                                }
                            }
                        }
                    },
                    tags: {
                        select: {
                            tag: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            likes: true,
                            comments: true,
                        }
                    },
                    files: {
                        where: {
                            mimetype: { startsWith: 'image/' },
                        },
                        select: { filename: true }
                    }
                }
            }),
        ])

        return {
            items: posts,
            total: total,
        }
    }
}