import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GraphQLModule } from './graphql/graphql.module.js';
import { PenyewaanModule } from './penyewaan/penyewaan.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    PrismaModule,
    PenyewaanModule,
    GraphQLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
