import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    FirebaseModule,
    ConfigModule.forRoot({ cache: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
