import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActiveUserData, IPagination } from 'src/common/interfaces';
import { ActiveUser, GetPagination } from 'src/common/decorators';
import { ContractStatusDto } from './dto/contract-status.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  getProfile(@ActiveUser() user: ActiveUserData) {
    return this.userService.getProfile(user);
  }

  @Get('contracts')
  getContracts(@ActiveUser() user: ActiveUserData, @GetPagination() pagination: IPagination) {
    return this.userService.getContracts(user, pagination);
  }

  @Post('contracts/status')
  setContractStatusByUserId(@ActiveUser() user: ActiveUserData, @Body() contractStatusDto: ContractStatusDto) {
    return this.userService.setContractStatusByUserId(user, contractStatusDto);
  }

  @Get('voted/contracts')
  getVotedContracts(@ActiveUser() user: ActiveUserData, @GetPagination() pagination: IPagination) {
    return this.userService.getVotedContracts(user, pagination);
  }

  @Get('sensors')
  getSensors(@ActiveUser() user: ActiveUserData, @GetPagination() pagination: IPagination) {
    return this.userService.getSensors(user, pagination);
  }
}

