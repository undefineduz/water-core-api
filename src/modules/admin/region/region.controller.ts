import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { GetPagination } from 'src/common/decorators';
import { IPagination } from 'src/common/interfaces';

@Controller('admin/region')
export class RegionController {
  constructor(private readonly regionService: RegionService) { }

  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get('state/:stateId')
  findAll(@Param('stateId', new ParseIntPipe()) id: number, @GetPagination() pagination: IPagination) {
    return this.regionService.findAll(id, pagination);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.regionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.regionService.remove(id);
  }
}
