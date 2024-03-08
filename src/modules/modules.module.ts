import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './hashing/hashing.module';
import { TokenModule } from './token/token.module';
import { AdminModule } from './admin/admin.module';
import { ContractModule } from './contract/contract.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [UserModule, AuthModule, HashingModule, TokenModule, AdminModule, ContractModule, ClientModule]
})
export class ModulesModule {}
