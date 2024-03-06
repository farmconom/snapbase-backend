import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseController } from './firebase.controller';
import { firebaseAdminConfig } from 'firebase-adminsdk';
import { FirebaseService } from './firebase.service';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: () => {
    const firebaseConfig = firebaseAdminConfig as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule],
  controllers: [FirebaseController],
  providers: [firebaseProvider, FirebaseService],
  exports: [],
})
export class FirebaseModule {}
