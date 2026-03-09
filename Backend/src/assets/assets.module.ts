import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/assets.entities';


@Module({
  imports: [TypeOrmModule.forFeature([Asset])],
  providers: [AssetsService],
  controllers: [AssetsController]
})
export class AssetsModule {}
