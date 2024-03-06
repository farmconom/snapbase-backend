import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { firebaseAdminConfig } from 'firebase-adminsdk';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: firebaseAdminConfig.client_email,
        privateKey: firebaseAdminConfig.private_key,
        projectId: firebaseAdminConfig.project_id,
      }),
      databaseURL: process.env.DATABASE_URL,
      storageBucket: `${firebaseAdminConfig.project_id}.appspot.com`,
    });
  }
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('SnapBase Api')
    .setDescription('REST API for SnapBase')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'SnapBase' });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
