# Tioo Rental API

REST API dan GraphQL untuk data pelanggan, kendaraan, dan penyewaan. Database lokal menggunakan SQLite melalui Prisma.

## Menjalankan proyek

```bash
npm install
```

Salin `.env.example` menjadi `.env`, lalu ganti `NIM_SUFFIX` dengan 3 digit terakhir NIM. Siapkan database dan data contoh:

```bash
npm run db:migrate -- --name init
npm run db:seed
npm run start:dev
```

Seeder membuat pelanggan dan kendaraan dengan akhiran NIM tersebut, lalu satu transaksi penyewaan contoh. SQLite disimpan di `prisma/dev.db`.

## REST API

| Method | URL | Keterangan |
|---|---|---|
| `GET` | `/penyewaan` | Daftar penyewaan beserta pelanggan dan kendaraan |
| `POST` | `/penyewaan` | Membuat penyewaan |
| `GET` | `/penyewaan/:id` | Detail penyewaan berdasarkan ID beserta profil relasinya |

Contoh body `POST /penyewaan`:

```json
{
  "pelangganId": 1,
  "kendaraanId": 1,
  "tanggalSewa": "2026-11-06T00:00:00.000Z",
  "tanggalKembali": "2026-11-07T00:00:00.000Z",
  "totalBiaya": 50123
}
```

Semua field wajib; ID harus bilangan bulat positif, total biaya harus angka minimal 0, tanggal harus ISO-8601, dan tanggal kembali harus setelah tanggal sewa. Field tambahan ditolak.

## GraphQL

Endpoint GraphQL: `http://localhost:3000/graphql`. Masukkan URL ini di Apollo Sandbox dan jalankan:

```graphql
query DaftarPenyewaan {
  daftarPenyewaan {
    id
    tanggalSewa
    totalBiaya
    pelanggan {
      nama
    }
    kendaraan {
      merk
    }
  }
}
```

## Model relasi

- Satu `Pelanggan` dapat memiliki banyak `Penyewaan`.
- Satu `Kendaraan` dapat muncul pada banyak `Penyewaan`.
- Setiap `Penyewaan` wajib merujuk tepat satu pelanggan dan satu kendaraan.

Jalankan pemeriksaan dengan `npm test`, `npm run test:e2e`, `npm run lint`, dan `npm run build`.
