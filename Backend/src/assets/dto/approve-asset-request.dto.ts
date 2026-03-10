import { IsNumber } from 'class-validator';

export class ApproveAssetRequestDto {
  @IsNumber()
  assetId: number;

  @IsNumber()
  allocatedBy: number;
}
