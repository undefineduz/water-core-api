import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LocalFilesModule } from './local-files/local-files.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [UsersModule, LocalFilesModule, ContractModule],
})
export class AdminModule { }
