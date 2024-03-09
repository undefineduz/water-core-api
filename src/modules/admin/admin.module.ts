import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LocalFilesModule } from './local-files/local-files.module';
import { ContractModule } from './contract/contract.module';
import { SensorsModule } from './sensors/sensors.module';
import { RegionModule } from './region/region.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [UsersModule, LocalFilesModule, ContractModule, SensorsModule, RegionModule, StateModule],
})
export class AdminModule { }
