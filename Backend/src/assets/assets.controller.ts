import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Patch } from '@nestjs/common';
import { AssignAssetDto } from './dto/assign-asset.dto';

@Controller('assets')
export class AssetsController {
    constructor(private readonly assetsService: AssetsService) { }

    @Post()
    create(@Body() createAssetDto: CreateAssetDto) {
        return this.assetsService.create(createAssetDto);
    }

    @Get()
    findAll() {
        return this.assetsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.assetsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.assetsService.remove(id);
    }

    @Patch(':id/assign')
    assignAsset(
        @Param('id') id: number,
        @Body() assignAssetDto: AssignAssetDto,
    ) {
        return this.assetsService.assignAsset(id, assignAssetDto.userId);
    }

    @Get('user/:userId')
    getAssetsByUser(@Param('userId') userId: number) {
        return this.assetsService.findAssetsByUser(userId);
    }
}