-- CreateTable
CREATE TABLE "Pelanggan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Kendaraan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platNomor" TEXT NOT NULL,
    "merk" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "biayaSewa" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Penyewaan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pelangganId" INTEGER NOT NULL,
    "kendaraanId" INTEGER NOT NULL,
    "tanggalSewa" DATETIME NOT NULL,
    "tanggalKembali" DATETIME NOT NULL,
    "totalBiaya" REAL NOT NULL,
    "dibuatPada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Penyewaan_pelangganId_fkey" FOREIGN KEY ("pelangganId") REFERENCES "Pelanggan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Penyewaan_kendaraanId_fkey" FOREIGN KEY ("kendaraanId") REFERENCES "Kendaraan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Kendaraan_platNomor_key" ON "Kendaraan"("platNomor");

-- CreateIndex
CREATE INDEX "Penyewaan_pelangganId_idx" ON "Penyewaan"("pelangganId");

-- CreateIndex
CREATE INDEX "Penyewaan_kendaraanId_idx" ON "Penyewaan"("kendaraanId");
