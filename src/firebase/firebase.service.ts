import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';

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

@Injectable()
export class FirestoreService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async getUsers(): Promise<any[]> {
    const usersSnapshot = await this.db.collection('users').get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  }

  async addUser(userData: CreateUserDto | UpdateUserDto): Promise<void> {
    await this.db.collection('users').add(userData);
  }

  async getUserById(userId: string): Promise<any | null> {
    const userDoc = await this.db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data();
  }

  async deleteUser(userId: string): Promise<void> {
    await this.db.collection('users').doc(userId).delete();
  }
}
