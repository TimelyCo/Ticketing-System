import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetDto } from './create-assert.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
