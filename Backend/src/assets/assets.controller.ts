import { Controller, Post, Body, Get } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')

export class AssetsController {
 constructor(private readonly assetsService: AssetsService) {}
 
 @Post()
 create(@Body() body) {
   return this.assetsService.create(body);
 }
 
 @Get()
 findAll() {
   return this.assetsService.findAll();
 }
}