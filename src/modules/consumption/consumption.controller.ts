import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto } from './dto/create-consumption.dto';
import { UpdateConsumptionDto } from './dto/update-consumption.dto';
import { ActiveUser, Auth } from 'src/common/decorators';
import { AuthType } from 'src/common/enums';
import { DateIntervalDto } from './dto/date-interval.dto';
import { ActiveUserData } from 'src/common/interfaces';

@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) { }

  @Auth(AuthType.None)
  @Post()
  create(@Body() createConsumptionDto: CreateConsumptionDto) {
    return this.consumptionService.create(createConsumptionDto);
  }

  @Get('statistic')
  public findAll(@ActiveUser() user: ActiveUserData, @Query() dateIntervalDto: DateIntervalDto) {
    return this.consumptionService.findAll(user.sub, dateIntervalDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumptionDto: UpdateConsumptionDto) {
    return this.consumptionService.update(+id, updateConsumptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumptionService.remove(+id);
  }
}
