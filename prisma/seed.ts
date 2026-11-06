
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { PrismaClient } from '../src/generated/prisma/client.js';

const nimSuffix = process.env.NIM_SUFFIX;

if (!nimSuffix || !/^\d{3}$/.test(nimSuffix)) {
  throw new Error('Set NIM_SUFFIX to the last 3 digits of your student ID.');
}

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
});

const prisma = new PrismaClient({ adapter });

try {
  const nama = `Augustio Syabri Maulana ${nimSuffix}`;
  const platNomor = `DR ${nimSuffix} AB`;

  const pelanggan = await prisma.pelanggan.upsert({
    where: { id: 1 },
    update: { nama },
    create: { id: 1, nama },
  });

  const kendaraan = await prisma.kendaraan.upsert({
    where: { platNomor },
    update: {
      merk: `Contoh ${nimSuffix}`,
      model: `Motor ${nimSuffix}`,
    },
    create: {
      platNomor,
      merk: `Contoh ${nimSuffix}`,
      model: `Motor ${nimSuffix}`,
      biayaSewa: 50123,
    },
  });

  const tanggalSewa = new Date();
  tanggalSewa.setUTCHours(0, 0, 0, 0);

  const existingRental = await prisma.penyewaan.findFirst({
    where: {
      pelangganId: pelanggan.id,
      kendaraanId: kendaraan.id,
      tanggalSewa,
    },
  });

  if (!existingRental) {
    const tanggalKembali = new Date(tanggalSewa);
    tanggalKembali.setUTCDate(tanggalKembali.getUTCDate() + 1);

    await prisma.penyewaan.create({
      data: {
        pelangganId: pelanggan.id,
        kendaraanId: kendaraan.id,
        tanggalSewa,
        tanggalKembali,
        totalBiaya: 50123,
      },
    });
  }

  console.log('Seed berhasil dijalankan!');
  console.log(`Nama pelanggan: ${nama}`);
  console.log(`Plat nomor kendaraan: ${platNomor}`);
} finally {
  await prisma.$disconnect();
}
