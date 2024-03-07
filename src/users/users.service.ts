import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FirestoreService } from '../firebase/firebase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    return await this.firestoreService.addUser(createUserDto, id);
  }

  async findAll() {
    return await this.firestoreService.getUsers();
  }

  async findOne(uid: string) {
    return await this.firestoreService.getUserById(uid);
  }

  async update(uid: string, updateUserDto: UpdateUserDto) {
    // Since Firestore does not have native update functionality like SQL databases, we'll perform a delete and create
    return await this.firestoreService.updateUser(updateUserDto, uid);
  }

  async remove(uid: string) {
    return await this.firestoreService.deleteUser(uid);
  }
}
