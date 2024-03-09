import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetPagination } from 'src/common/decorators/get-pagination';
import { IPagination } from 'src/common/interfaces';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  findAll(@Query('regionId') regionId: number, @GetPagination() pagination: IPagination) {
    return this.usersService.getAll({ ...pagination, regionId });
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }

}
