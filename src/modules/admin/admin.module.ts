import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LocalFilesModule } from './local-files/local-files.module';
import { ContractModule } from './contract/contract.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [UsersModule, LocalFilesModule, ContractModule, SensorsModule],
})
export class AdminModule { }
