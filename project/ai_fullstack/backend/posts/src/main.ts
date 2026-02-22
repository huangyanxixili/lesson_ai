// 引入 创建nest应用的核心工厂类
import { NestFactory } from '@nestjs/core';
// 引入 应用的根模块
import { AppModule } from './app.module';
// 将nestjs 像express 一样拥有一些服务，给 TypeScript 看的 类型说明书
import { NestExpressApplication } from '@nestjs/platform-express';
// 自动对 进入Controller的数据进行验证和转换
import { ValidationPipe } from '@nestjs/common';
// node 内置模块 path 路径处理模块 join 用于拼接路径
import { join } from 'path';

async function bootstrap() {
  // 如果自己new一个Nest应用极其复杂，但是使用工厂NestFactory.create可以直接创建nest应用实例
  // 让开发者聚焦于应用开发，而将底层细节交给工厂处理
  // 底座基于express
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // 允许跨域
  });
  app.setGlobalPrefix('api'); // 全局路由前缀/api
  // 启用全局验证管道，将原始数据转换为dto类实例（Controller愿意接收的数据）
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 自动过滤dto 未定义的属性
    // forbidNonWhitelisted: true, // 遇到未定义的属性直接报错
    transform: true, // “1” transform 1 （自动类型转换）
  }));
  // 搭建静态资源目录
  // process.cwd()当前项目根目录 拼接 uploads 目录
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
