import { UserService } from 'src/user/user.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { ConfigService } from '@nestjs/config';
import { ApiResponse } from 'src/helpers/response.helper';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization }: any = request.headers;
    if (authorization) {
      const authToken = authorization.replace(/bearer/i, '').trim();
      const resp = await this.validateToken(authToken);
      request.user = resp;
      return true;
    } else {
      request.user = null;
      return true;
    }
  }

  async validateToken(token: string) {
    const { userId } = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
    let user: ApiResponse<User>;
    if (userId) {
      user = await this.userService.getUserByUid(userId);
    }
    return user.data;
  }
}
