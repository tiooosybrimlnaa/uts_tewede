import { Module } from '@nestjs/common';
import { PenyewaanController } from './penyewaan.controller.js';
import { PenyewaanService } from './penyewaan.service.js';

@Module({
  controllers: [PenyewaanController],
  providers: [PenyewaanService],
  exports: [PenyewaanService],
})
export class PenyewaanModule {}
