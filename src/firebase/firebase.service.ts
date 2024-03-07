import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { addPrefixToKeys, createResponse } from 'src/helpers/response.helper';

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
    try {
      const usersSnapshot = await this.db.collection('users').get();
      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      return createResponse(200, 'Get users successfully', users);
    } catch (error) {
      return createResponse(
        500,
        'Failed to get users',
        error.message || 'Unknown error',
      );
    }
  }

  async getUserById(uid: string): Promise<any | null> {
    try {
      const userSnapshot = await this.db
        .collection('users')
        .where('uid', '==', uid)
        .get();
      if (userSnapshot.empty) {
        return createResponse(404, 'User not found', null);
      }
      // Assuming there's only one user with the provided uid
      const userData = userSnapshot.docs[0].data();
      return createResponse(200, 'Get user successfully', userData);
    } catch (error) {
      return createResponse(
        500,
        'Failed to get user',
        error.message || 'Unknown error',
      );
    }
  }

  async addUser(userData: CreateUserDto, id: string): Promise<any | null> {
    try {
      const createdAt = admin.firestore.FieldValue.serverTimestamp();
      const updatedAt = admin.firestore.FieldValue.serverTimestamp();
      const userWithId = { ...userData, id, createdAt, updatedAt };

      await this.db.collection('users').doc(id).set(userWithId);
      return createResponse(200, 'User created successfully', userWithId);
    } catch (error) {
      return createResponse(
        500,
        'Failed to create user',
        error.message || 'Unknown error',
      );
    }
  }

  async updateUser(userData: UpdateUserDto, uid: string): Promise<any | null> {
    try {
      const newUpdatedAt = new Date(); // Use new Date() to get the current timestamp
      const newUserData = { ...userData, updatedAt: newUpdatedAt };
      const updatedUserData = addPrefixToKeys(newUserData);
      const userQuerySnapshot = await this.db
        .collection('users')
        .where('uid', '==', uid)
        .get();

      // Check if any user documents match the query
      if (userQuerySnapshot.empty) {
        return createResponse(404, 'User not found', null);
      }

      // Update each matching user document
      const updatePromises = userQuerySnapshot.docs.map(async (doc) => {
        await doc.ref.update(updatedUserData);
      });

      // Wait for all update operations to complete
      await Promise.all(updatePromises);

      // Fetch the updated user data after the update operation
      const updatedUserDocs = await Promise.all(
        userQuerySnapshot.docs.map((doc) => doc.ref.get()),
      );
      const updatedUsers = updatedUserDocs.map((doc) =>
        doc.exists ? doc.data() : null,
      );

      return createResponse(200, 'User updated successfully', updatedUsers);
    } catch (error) {
      return createResponse(
        500,
        'Failed to update user',
        error.message || 'Unknown error',
      );
    }
  }

  async deleteUser(uid: string): Promise<any> {
    try {
      // Find the user document based on the UID
      const userQuerySnapshot = await this.db
        .collection('users')
        .where('uid', '==', uid)
        .get();

      // Check if a matching user document exists
      if (userQuerySnapshot.empty) {
        return createResponse(404, 'User not found', false);
      }

      // Delete the user document
      await userQuerySnapshot.docs[0].ref.delete();

      return createResponse(200, 'User deleted successfully', true);
    } catch (error) {
      return createResponse(
        500,
        'Failed to delete user',
        error.message || 'Unknown error',
      );
    }
  }
}
