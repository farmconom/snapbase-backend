import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { UserService } from 'src/user/user.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from 'src/middleware/auth-middleware';

@Module({
  imports: [
    FirebaseModule,
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    FirebaseService,
    AuthMiddleware,
    ConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
