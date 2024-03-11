import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import {
  ApiResponse,
  addPrefixToKeys,
  createResponse,
} from 'src/helpers/response.helper';
import {
  SignInWithEmailInput,
  SignUpWithEmailInput,
} from 'src/auth/dto/sing.input';
import { User } from 'src/users/entities/user.entity';
import { convertUserFirebase } from 'src/helpers/convert-user-firebase.helper';

@Injectable()
export class FirestoreService {
  private readonly db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  // async getUsers(): Promise<any[]> {
  //   try {
  //     const usersSnapshot = await this.db.collection('users').get();
  //     const users = [];
  //     usersSnapshot.forEach((doc) => {
  //       users.push(doc.data());
  //     });
  //     return createResponse(200, 'Get users successfully', users);
  //   } catch (error) {
  //     return createResponse(
  //       500,
  //       'Failed to get users',
  //       error.message || 'Unknown error',
  //     );
  //   }
  // }

  async getUserById(uid: string): Promise<ApiResponse<User | null>> {
    try {
      const userSnapshot = await this.db
        .collection('users')
        .where('uid', '==', uid)
        .get();
      if (userSnapshot.empty) {
        return createResponse(404, 'User not found', null);
      }
      // Assuming there's only one user with the provided uid
      const userData = convertUserFirebase(userSnapshot.docs[0].data());
      return createResponse(200, 'Get user successfully', userData);
    } catch (error) {
      return createResponse(
        500,
        'Failed to get user',
        error.message || 'Unknown error',
      );
    }
  }

  async addUser(
    userData: CreateUserDto,
    id: string,
  ): Promise<ApiResponse<User | null>> {
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

  async updateUser(
    userData: UpdateUserDto,
    uid: string,
  ): Promise<ApiResponse<admin.firestore.DocumentData[] | null>> {
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

  async deleteUser(uid: string): Promise<ApiResponse<boolean>> {
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

@Injectable()
export class FirebaseService {
  constructor(private firestoreService: FirestoreService) {}

  async signUpWithEmailAndPassword(
    payload: SignUpWithEmailInput,
  ): Promise<ApiResponse<firebase.User>> {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);
      const user = userCredential.user;

      const mappingUser: CreateUserDto = {
        email: user.email,
        phoneNumber: user.phoneNumber,
        displayName: payload.userName,
        photoURL: user.photoURL,
        uid: user.uid,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
      };

      await user.updateProfile({
        displayName: payload.userName,
      });

      await this.firestoreService.addUser(mappingUser, mappingUser.uid);

      const userResp = convertUserFirebase(userCredential.user);
      return createResponse(200, 'Sign up with email successfully', userResp);
    } catch (error) {
      return createResponse(
        500,
        'Failed to sign up with email',
        error.message || 'Unknown error',
      );
    }
  }

  async signInWithEmailAndPassword(
    payload: SignInWithEmailInput,
  ): Promise<ApiResponse<User>> {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      const user = convertUserFirebase(userCredential.user);
      return createResponse(200, 'Sign in with email successfully', user);
    } catch (error) {
      return createResponse(
        500,
        'Failed to sign in with email',
        error.message || 'Unknown error',
      );
    }
  }

  async signInWithGoogle(): Promise<ApiResponse<User>> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      // Sign in with Google using a popup window
      const userCredential = await firebase.auth().signInWithPopup(provider);
      const user = convertUserFirebase(userCredential.user);

      return createResponse(200, 'Sign in with google successfully', user);
    } catch (error) {
      return createResponse(
        500,
        'Failed to sign in with google',
        error.message || 'Unknown error',
      );
    }
  }

  async generateEmailVerificationLink(
    email: string,
  ): Promise<ApiResponse<string>> {
    try {
      const link = await admin.auth().generateEmailVerificationLink(email);
      return createResponse(
        200,
        'Generate email verification link successfully',
        link,
      );
    } catch (error) {
      return createResponse(
        500,
        'Failed to generate email verification link',
        error.message || 'Unknown error',
      );
    }
  }

  async generatePasswordResetLink(email: string): Promise<ApiResponse<string>> {
    try {
      const link = await admin.auth().generatePasswordResetLink(email);

      return createResponse(
        200,
        'Generate password reset link successfully',
        link,
      );
    } catch (error) {
      return createResponse(
        500,
        'Failed to generate password reset link',
        error.message || 'Unknown error',
      );
    }
  }
}
