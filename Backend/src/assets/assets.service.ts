import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Asset } from './entities/asset.entity';
import { AssetRequest } from './entities/asset-request.entity';
import { AssetAllocation } from './entities/asset-allocation.entity';

import { CreateAssetDto } from './dto/create-assert.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { CreateAssetRequestDto } from './dto/create-asset-request.dto';
import { ApproveAssetRequestDto } from './dto/approve-asset-request.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetRepo: Repository<Asset>,

    @InjectRepository(AssetRequest)
    private requestRepo: Repository<AssetRequest>,

    @InjectRepository(AssetAllocation)
    private allocationRepo: Repository<AssetAllocation>,
  ) {}

  // Asset Inventory
  createAsset(dto: CreateAssetDto) {
    const asset = this.assetRepo.create(dto);
    return this.assetRepo.save(asset);
  }

  getAssets() {
    return this.assetRepo.find();
  }

  getAsset(id: number) {
    return this.assetRepo.findOne({ where: { id } });
  }

  updateAsset(id: number, dto: UpdateAssetDto) {
    return this.assetRepo.update(id, dto);
  }

  deleteAsset(id: number) {
    return this.assetRepo.delete(id);
  }

  // Asset Requests
  createRequest(dto: CreateAssetRequestDto) {
    const request = this.requestRepo.create(dto);
    return this.requestRepo.save(request);
  }

  getRequests() {
    return this.requestRepo.find();
  }

  // Approve Request and Allocate Asset
  async approveRequest(id: number, dto: ApproveAssetRequestDto) {
    const request = await this.requestRepo.findOne({ where: { id } });

    if (!request) {
      throw new NotFoundException(`Asset request with ID ${id} not found`);
    }

    request.status = 'APPROVED';
    await this.requestRepo.save(request);

    const allocation = this.allocationRepo.create({
      requestId: id,
      assetId: dto.assetId,
      allocatedBy: dto.allocatedBy,
    });

    await this.allocationRepo.save(allocation);

    await this.assetRepo.update(dto.assetId, {
      status: 'ASSIGNED',
    });

    return allocation;
  }

  getAllocations() {
    return this.allocationRepo.find();
  }
}
