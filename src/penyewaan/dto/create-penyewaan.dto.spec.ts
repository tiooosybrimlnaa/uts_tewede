import { validate } from 'class-validator';
import { CreatePenyewaanDto } from './create-penyewaan.dto.js';

describe('CreatePenyewaanDto', () => {
  const validRental = () =>
    Object.assign(new CreatePenyewaanDto(), {
      pelangganId: 1,
      kendaraanId: 1,
      tanggalSewa: '2026-11-06T00:00:00.000Z',
      tanggalKembali: '2026-11-07T00:00:00.000Z',
      totalBiaya: 0,
    });

  it('accepts ISO dates, positive IDs, and a zero total', async () => {
    await expect(validate(validRental())).resolves.toHaveLength(0);
  });

  it('rejects invalid IDs, negative totals, and a return date before rental', async () => {
    const dto = Object.assign(validRental(), {
      pelangganId: 0,
      kendaraanId: 1.5,
      tanggalKembali: '2026-11-05T00:00:00.000Z',
      totalBiaya: -1,
    });

    const errors = await validate(dto);

    expect(errors.map(({ property }) => property)).toEqual(
      expect.arrayContaining([
        'pelangganId',
        'kendaraanId',
        'tanggalKembali',
        'totalBiaya',
      ]),
    );
  });
});
