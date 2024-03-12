import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CoordinationsService } from './coordinations.service';
import { CreateCoordinationDto } from './dto/create-coordination.dto';
import { UpdateCoordinationDto } from './dto/update-coordination.dto';
import { GetPagination } from 'src/common/decorators';
import { IPagination } from 'src/common/interfaces';

@Controller('admin/coordinations')
export class CoordinationsController {
  constructor(private readonly coordinationsService: CoordinationsService) { }

  @Post()
  create(@Body() createCoordinationDto: CreateCoordinationDto) {
    return this.coordinationsService.create(createCoordinationDto);
  }

  @Get()
  findAll(@GetPagination() pagination: IPagination) {
    return this.coordinationsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.coordinationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateCoordinationDto: UpdateCoordinationDto) {
    return this.coordinationsService.update(id, updateCoordinationDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.coordinationsService.remove(id);
  }
}
