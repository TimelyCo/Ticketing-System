import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateAssetRequestDto {
  @IsNumber()
  employeeId: number;

  @IsString()
  @IsNotEmpty()
  assetType: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
