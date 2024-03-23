import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { GetPagination } from 'src/common/decorators';
import { IPagination } from 'src/common/interfaces';
import { GetVoitedDto } from './dto/get-voited.dto';

@Controller('admin/contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) { }

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get()
  findAll(@GetPagination() pagination: IPagination) {
    return this.contractService.findAll(pagination);
  }

  @Get('fermer/:id')
  getFermersContracts(@Param('id', new ParseIntPipe()) id: number, @GetPagination() pagination: IPagination) {
    return this.contractService.getFermersContracts(+id, pagination);
  }

  @Get('voited')
  getVoited(@GetPagination() pagination: IPagination, @Query() query: GetVoitedDto) {
    return this.contractService.getVoited(pagination, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
