import {
  IsDateString,
  IsInt,
  IsNumber,
  Min,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAfterTanggalSewa', async: false })
class IsAfterTanggalSewaConstraint implements ValidatorConstraintInterface {
  validate(value: unknown, args?: ValidationArguments): boolean {
    if (typeof value !== 'string' || !args) {
      return false;
    }
    const dto = args.object as CreatePenyewaanDto;
    const tanggalSewa = new Date(dto.tanggalSewa);
    const tanggalKembali = new Date(value);
    return (
      !Number.isNaN(tanggalSewa.getTime()) &&
      !Number.isNaN(tanggalKembali.getTime()) &&
      tanggalKembali > tanggalSewa
    );
  }

  defaultMessage(): string {
    return 'tanggalKembali harus setelah tanggalSewa.';
  }
}

export class CreatePenyewaanDto {
  @IsInt()
  @Min(1)
  pelangganId!: number;

  @IsInt()
  @Min(1)
  kendaraanId!: number;

  @IsDateString()
  tanggalSewa!: string;

  @IsDateString()
  @Validate(IsAfterTanggalSewaConstraint)
  tanggalKembali!: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  totalBiaya!: number;
}
