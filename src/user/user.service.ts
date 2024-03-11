import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FirestoreService } from '../firebase/firebase.service';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from 'src/helpers/response.helper';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    return await this.firestoreService.addUser(createUserDto, id);
  }

  async getUserByUid(uid: string): Promise<ApiResponse<User>> {
    const user = await this.firestoreService.getUserById(uid);
    if (!user.data) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async update(uid: string, updateUserDto: UpdateUserDto) {
    // Since Firestore does not have native update functionality like SQL databases, we'll perform a delete and create
    return await this.firestoreService.updateUser(updateUserDto, uid);
  }

  async remove(uid: string) {
    return await this.firestoreService.deleteUser(uid);
  }
}
