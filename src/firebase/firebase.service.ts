import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  async generateEmailVerificationLink(email: string): Promise<string> {
    const link = await admin.auth().generateEmailVerificationLink(email);
    return link;
  }

  async generatePasswordResetLink(email: string): Promise<string> {
    const link = await admin.auth().generatePasswordResetLink(email);
    return link;
  }
}
