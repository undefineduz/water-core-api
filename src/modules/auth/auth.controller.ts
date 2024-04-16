import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { RefreshTokenDto } from '../token/dto';
import { ActiveUser, Auth } from 'src/common/decorators';
import { AuthType } from 'src/common/enums';
import { ActiveUserData } from 'src/common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  login(@Body() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }

  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @Get('me')
  getMe(@ActiveUser() user: ActiveUserData) {
    return user;
  }
}
