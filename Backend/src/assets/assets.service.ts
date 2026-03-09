import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/assets.entities';

@Injectable()
export class AssetsService {

 constructor(
   @InjectRepository(Asset)
   private assetRepository: Repository<Asset>,
 ) {}
 create(asset: Partial<Asset>) {
   return this.assetRepository.save(asset);
 }
 findAll() {
   return this.assetRepository.find();
 }

}