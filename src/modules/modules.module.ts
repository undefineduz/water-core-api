import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './hashing/hashing.module';
import { TokenModule } from './token/token.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UserModule, AuthModule, HashingModule, TokenModule, AdminModule]
})
export class ModulesModule {}
