import { Module } from '@nestjs/common';
import { PenyewaanModule } from '../penyewaan/penyewaan.module.js';
import { GraphQLController } from './graphql.controller.js';

@Module({
  imports: [PenyewaanModule],
  controllers: [GraphQLController],
})
export class GraphQLModule {}
