import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/common/configs';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync(JwtConfig.asProvider()),
  ],
  providers: [RefreshTokenIdsStorage, TokenService],
  exports: [TokenService],
})
export class TokenModule { }
