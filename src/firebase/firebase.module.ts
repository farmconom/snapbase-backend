import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseController } from './firebase.controller';
import { FirebaseService, FirestoreService } from './firebase.service';

@Module({
  imports: [ConfigModule],
  controllers: [FirebaseController],
  providers: [FirebaseService, FirestoreService],
  exports: [FirestoreService, FirestoreService],
})
export class FirebaseModule {}
