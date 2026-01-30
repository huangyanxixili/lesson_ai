// 把 Prisma（数据库工具） 和 NestJS（后端框架） 融合在了一起
// 只要其他地方只要注入 PrismaService ，就直接得到一个已经连接好的、功能强大的数据库操作对象
// 数据库连接器

import { Injectable, OnModuleInit } from '@nestjs/common';
// PrismaClient 是 Prisma 自动生成的、类型安全的数据库查询客户端，包含了所有操作数据库的方法，但是本身只是一个普通的类，不懂 NestJS 的规矩
import { PrismaClient } from '@prisma/client';

@Injectable() // 告诉 NestJS 这个类（PrismaService）可以被“注入”到其他地方使用
// TypeScript 以面向对象的方式操作数据库。
export class PrismaService
  extends PrismaClient // 继承PrismaClient，使PrismaService既能操作数据库（PrismaClient 的能力），又能被 NestJS 管理（Injectable 的能力）
  implements OnModuleInit // 生命周期钩子，
{
  async onModuleInit() { // 当模块初始化时调用，自动执行这个函数
    await this.$connect(); // 自动连接数据库
  }
}