import { NestFactory } from '@nestjs/core';
// 模块化
import { AppModule } from './app.module';
import { config } from 'dotenv';

// 加载环境变量
config();

async function bootstrap() {
  // server app 启动
  // 工厂模式
  // NestFactory nest的工厂类 用于创建 Nest 应用实例
  // 根模块 AppModule 是应用的入口模块
  const app = await NestFactory.create(AppModule);
  // 监听端口 3000
  // 进程对象process 环境变量PORT（端口） 或 3000
  // 相当于process.env.PORT ? process.env.PORT : 3000
  // 空值合并运算符 ?? ES2020 ES11 让代码更加优雅
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
