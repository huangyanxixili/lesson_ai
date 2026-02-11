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

        // 查询数据，再整备一下
        const data = posts.map(post => ({
            id: post.id,
            title: post.title,
            // 将 content 截取（列表简介）
            brief: post.content ? post.content.substring(0, 100) : '',
            // publishedAt: post.createdAt || null,
            user: {
                id: post.user?.id,
                name: post.user?.name,
                avatar: `http://localhost:3000/uploads/avatar/resized/${post.user?.avatars[0]?.filename}-small.jpg`,
            },
            tags: post.tags.map(t => t.tag.name),
            totalLikes: post._count.likes,
            totalComments: post._count.comments,
            thumbnail: `http://localhost:3000/uploads/resized/${post.files[0]?.filename}-thumbnail.jpg` || null,
        }))

        return {
            items: data,
            total: total,
        }
    }

    async createPost(data: {
        title: string;
        content: string;
        userId: string;
    }) {
        return this.prisma.post.create({
            data: {
                title: data.title,
                content: data.content,
                userId: Number(data.userId)
            }
        })
    }
}