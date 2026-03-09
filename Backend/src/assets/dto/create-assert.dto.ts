import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateAssetDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  serialNumber: string;

  @IsOptional()
  @IsInt()
  count?: number;
}
