import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { firebaseAdminConfig } from 'firebase-adminsdk';
import dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './common/configs/config.interface';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseProjectConfig } from 'firebase-config';

async function bootstrap() {
  dotenv.config();

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

  // Firebase configuration
  const firebaseConfig = {
    apiKey: firebaseProjectConfig.apiKey,
    authDomain: firebaseProjectConfig.authDomain,
    projectId: firebaseProjectConfig.projectId,
    storageBucket: firebaseProjectConfig.storageBucket,
    messagingSenderId: firebaseProjectConfig.messagingSenderId,
    appId: firebaseProjectConfig.appId,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // Set persistence for Firebase Authentication to none
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  }
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .addBearerAuth()
      .build();

    const servers = swaggerConfig.servers || [];
    if (servers.length > 0) {
      options.servers = servers.map((url) => ({ url }));
    }
    const document = SwaggerModule.createDocument(app, options);
    // Sort paths alphabetically
    document.paths = Object.keys(document.paths)
      .sort()
      .reduce((acc, key) => {
        acc[key] = document.paths[key];
        return acc;
      }, {});

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
