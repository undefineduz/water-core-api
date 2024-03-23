import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { GetPagination } from 'src/common/decorators';
import { IPagination } from 'src/common/interfaces';
import { SttachSensorToUserDto } from './dto/attach-sensor-to-user.dto';

@Controller('admin/sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) { }

  @Post()
  create(@Body() createSensorDto: CreateSensorDto) {
    return this.sensorsService.create(createSensorDto);
  }

  @Get()
  findAll(@GetPagination() pagination: IPagination) {
    return this.sensorsService.findAll(pagination);
  }

  @Get('fermer/:id')
  getFermersSensors(@Param('id', new ParseIntPipe()) id: number, @GetPagination() pagination: IPagination) {
    return this.sensorsService.getFermersSensors(id, pagination);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.sensorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateSensorDto: UpdateSensorDto) {
    return this.sensorsService.update(id, updateSensorDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.sensorsService.remove(id);
  }

  @Post('attach')
  attachSensorToUser(@Body() body: SttachSensorToUserDto) {
    return this.sensorsService.attachSensorToUser(body);
  }
}
