// firebase.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/helpers/response.helper';

@Controller('firebase')
@ApiTags('FirebaseLink')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Get('verification-link/:email')
  async generateEmailVerificationLink(
    @Param('email') email: string,
  ): Promise<ApiResponse<string>> {
    const verificationLink =
      await this.firebaseService.generateEmailVerificationLink(email);
    return verificationLink;
  }

  @Get('password-reset-link/:email')
  async generatePasswordResetLink(
    @Param('email') email: string,
  ): Promise<ApiResponse<string>> {
    const verificationLink =
      await this.firebaseService.generatePasswordResetLink(email);
    return verificationLink;
  }
}
