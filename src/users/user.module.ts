import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { CustomAuthGuard } from 'src/auth/guard/custom.guard';
import { FirestoreService } from 'src/firebase/firebase.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [FirebaseModule, FirebaseModule, AuthModule, JwtModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    CustomAuthGuard,
    FirestoreService,
    JwtStrategy,
    JwtService,
    AuthService,
  ],
})
export class UsersModule {}
