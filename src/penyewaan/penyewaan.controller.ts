
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { CreatePenyewaanDto } from './dto/create-penyewaan.dto.js';
import { PenyewaanService } from './penyewaan.service.js';

@Controller('penyewaan')
export class PenyewaanController {
  constructor(private readonly penyewaanService: PenyewaanService) {}

  @Get()
  findAll() {
    return this.penyewaanService.findAll();
  }

  @Post()
  create(@Body() dto: CreatePenyewaanDto) {
    return this.penyewaanService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.penyewaanService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePenyewaanDto,
  ) {
    return this.penyewaanService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.penyewaanService.remove(id);
  }
  
}
