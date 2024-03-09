import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto';
import { UserService } from '../user/user.service';
import { HashingService } from '../hashing/hashing.service';
import { TokenService } from '../token/token.service';
import { RefreshTokenDto } from '../token/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService
  ) { }

  public async login({ username, password }: SignInDto) {
    const user = await this.userService.getByUsername(username);

    const isEqual = await this.hashingService.compare(password, user.password);
    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    const tokens = await this.tokenService.generateTokens(user);
    return { ...tokens, role: user.role };
  }

  public async refreshTokens(refreshToken: RefreshTokenDto) {
    return await this.tokenService.refreshTokens(refreshToken);
  }


}
