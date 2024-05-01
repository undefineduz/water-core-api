import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TotalConsumptionService } from './total-consumption.service';
import { CreateTotalConsumptionDto } from './dto/create-total-consumption.dto';
import { UpdateTotalConsumptionDto } from './dto/update-total-consumption.dto';

@Controller('total-consumption')
export class TotalConsumptionController {
  constructor(private readonly totalConsumptionService: TotalConsumptionService) {}

  @Post()
  create(@Body() createTotalConsumptionDto: CreateTotalConsumptionDto) {
    return this.totalConsumptionService.create(createTotalConsumptionDto);
  }

  @Get()
  findAll() {
    return this.totalConsumptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.totalConsumptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTotalConsumptionDto: UpdateTotalConsumptionDto) {
    return this.totalConsumptionService.update(+id, updateTotalConsumptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.totalConsumptionService.remove(+id);
  }
}
