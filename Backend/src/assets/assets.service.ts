import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsService {
    constructor(
        @InjectRepository(Asset)
        private assetRepository: Repository<Asset>,
    ) { }

    create(createAssetDto: CreateAssetDto) {
        const asset = this.assetRepository.create(createAssetDto);
        return this.assetRepository.save(asset);
    }

    findAll() {
        return this.assetRepository.find();
    }

    findOne(id: number) {
        return this.assetRepository.findOneBy({ id });
    }

    remove(id: number) {
        return this.assetRepository.delete(id);
    }

    async assignAsset(assetId: number, userId: number) {
        const asset = await this.assetRepository.findOneBy({ id: assetId });

        if (!asset) {
            throw new Error('Asset not found');
        }

        asset.assigned_to = userId;
        asset.status = 'ASSIGNED';

        return this.assetRepository.save(asset);
    }

    async findAssetsByUser(userId: number) {
        return this.assetRepository.find({
            where: { assigned_to: userId },
        });
    }
}