// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { ContractService } from './contract.service';
// import { CreateContractDto } from './dto/create-contract.dto';
// import { UpdateContractDto } from './dto/update-contract.dto';
// import { ActiveUser, GetPagination } from 'src/common/decorators';
// import { ActiveUserData, IPagination } from 'src/common/interfaces';

// @Controller('contract')
// export class ContractController {
//     constructor(private readonly contractService: ContractService) { }

//     @Post()
//     create(@Body() createContractDto: CreateContractDto) {
//         return this.contractService.create(createContractDto);
//     }

//     @Get()
//     findAll(@ActiveUser() user: ActiveUserData, @GetPagination() pagination: IPagination) {
//         return this.contractService.findAll(user.sub, pagination);
//     }

//     @Get(':id')
//     findOne(@Param('id') id: string) {
//         return this.contractService.findOne(+id);
//     }

//     @Patch(':id')
//     update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
//         return this.contractService.update(+id, updateContractDto);
//     }

//     @Delete(':id')
//     remove(@Param('id') id: string) {
//         return this.contractService.remove(+id);
//     }
// }
