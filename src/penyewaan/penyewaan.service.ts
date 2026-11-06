
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePenyewaanDto } from './dto/create-penyewaan.dto.js';

const rentalRelations = {
  pelanggan: true,
  kendaraan: true,
} satisfies Prisma.PenyewaanInclude;

@Injectable()
export class PenyewaanService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.penyewaan.findMany({
      include: rentalRelations,
      orderBy: { tanggalSewa: 'desc' },
    });
  }

  async findOne(id: number) {
    const penyewaan = await this.prisma.penyewaan.findUnique({
      where: { id },
      include: rentalRelations,
    });

    if (!penyewaan) {
      throw new NotFoundException(
        `Penyewaan dengan ID ${id} tidak ditemukan.`,
      );
    }

    return penyewaan;
  }

  async create(dto: CreatePenyewaanDto) {
    try {
      return await this.prisma.penyewaan.create({
        data: {
          ...dto,
          tanggalSewa: new Date(dto.tanggalSewa),
          tanggalKembali: new Date(dto.tanggalKembali),
        },
        include: rentalRelations,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'pelangganId atau kendaraanId tidak merujuk data yang tersedia.',
        );
      }

      throw error;
    }
  }

  async update(id: number, dto: CreatePenyewaanDto) {
    await this.findOne(id);

    try {
      return await this.prisma.penyewaan.update({
        where: { id },
        data: {
          ...dto,
          tanggalSewa: new Date(dto.tanggalSewa),
          tanggalKembali: new Date(dto.tanggalKembali),
        },
        include: rentalRelations,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'pelangganId atau kendaraanId tidak merujuk data yang tersedia.',
        );
      }

      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.penyewaan.delete({
      where: { id },
    });
  }
}
