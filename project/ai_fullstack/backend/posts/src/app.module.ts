import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [
    PostsModule, 
    // PrismaModule prisma命令行的方式，客户端client代表数据库
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
