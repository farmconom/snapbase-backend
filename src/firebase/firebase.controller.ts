// firebase.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('firebase')
@ApiTags('FirebaseLink')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('verification-link/:email')
  async generateEmailVerificationLink(
    @Param('email') email: string,
  ): Promise<string> {
    return this.firebaseService.generateEmailVerificationLink(email);
  }

  @Get('password-reset-link/:email')
  async generatePasswordResetLink(
    @Param('email') email: string,
  ): Promise<string> {
    return this.firebaseService.generatePasswordResetLink(email);
  }
}
