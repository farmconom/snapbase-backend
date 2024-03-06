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
  ): Promise<{ status: number; message: string; data: string }> {
    try {
      const verificationLink =
        await this.firebaseService.generateEmailVerificationLink(email);
      return {
        status: 200,
        message: 'Email verification link generated successfully',
        data: verificationLink,
      };
    } catch (error) {
      return { status: 500, message: 'Internal server error', data: null };
    }
  }

  @Get('password-reset-link/:email')
  async generatePasswordResetLink(
    @Param('email') email: string,
  ): Promise<{ status: number; message: string; data: string }> {
    try {
      const verificationLink =
        await this.firebaseService.generatePasswordResetLink(email);
      return {
        status: 200,
        message: 'Reset password link generated successfully',
        data: verificationLink,
      };
    } catch (error) {
      return { status: 500, message: 'Internal server error', data: null };
    }
  }
}
