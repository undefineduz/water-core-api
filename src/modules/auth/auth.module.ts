import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { HashingModule } from '../hashing/hashing.module';
import { TokenModule } from '../token/token.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard, AuthenticationGuard } from 'src/common/guards';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/common/configs';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
  imports: [
    UserModule,
    HashingModule,
    TokenModule,
    JwtModule.registerAsync(JwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    AuthService
  ],
})
export class AuthModule { } 
