import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { AssetsService } from './assets.service';

import { CreateAssetDto } from './dto/create-assert.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { CreateAssetRequestDto } from './dto/create-asset-request.dto';
import { ApproveAssetRequestDto } from './dto/approve-asset-request.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly service: AssetsService) {}

  // Assets
  @Post()
  createAsset(@Body() dto: CreateAssetDto) {
    return this.service.createAsset(dto);
  }

  @Get()
  getAssets() {
    return this.service.getAssets();
  }

  @Get(':id')
  getAsset(@Param('id') id: number) {
    return this.service.getAsset(id);
  }

  @Put(':id')
  updateAsset(@Param('id') id: number, @Body() dto: UpdateAssetDto) {
    return this.service.updateAsset(id, dto);
  }

  @Delete(':id')
  deleteAsset(@Param('id') id: number) {
    return this.service.deleteAsset(id);
  }

  // Requests
  @Post('request')
  createRequest(@Body() dto: CreateAssetRequestDto) {
    return this.service.createRequest(dto);
  }

  @Get('request/all')
  getRequests() {
    return this.service.getRequests();
  }

  // Approve
  @Patch('request/:id/approve')
  approveRequest(@Param('id') id: number, @Body() dto: ApproveAssetRequestDto) {
    return this.service.approveRequest(id, dto);
  }

  // Allocations
  @Get('allocations')
  getAllocations() {
    return this.service.getAllocations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAssetDto) {
    return this.service.updateAsset(+id, dto);
  }
}
