import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import config from './common/configs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { FirestoreService } from './firebase/firebase.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/user.service';
import { AuthMiddleware } from './middleware/auth-middleware';

@Module({
  imports: [
    UsersModule,
    JwtModule,
    FirebaseModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    FirestoreService,
    AuthService,
    UsersService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
