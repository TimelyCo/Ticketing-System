import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Asset } from './entities/asset.entity';
import { AssetRequest } from './entities/asset-request.entity';
import { AssetAllocation } from './entities/asset-allocation.entity';

import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asset, AssetRequest, AssetAllocation])],
  providers: [AssetsService],
  controllers: [AssetsController],
})
export class AssetsModule {}
