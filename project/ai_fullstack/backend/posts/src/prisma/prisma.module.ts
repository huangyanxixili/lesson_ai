import { 
    Module,
    Global,
} from '@nestjs/common'
import { PrismaService } from './prisma.service';

// 全局注入依赖，让模块提供的服务可在全局使用，nestjs自动处理
@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule{}