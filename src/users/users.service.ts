import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FirestoreService } from '../firebase/firebase.service';

@Injectable()
export class UsersService {
  constructor(private readonly firestoreService: FirestoreService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.firestoreService.addUser(createUserDto);
  }

  async findAll() {
    return await this.firestoreService.getUsers();
  }

  async findOne(id: string) {
    return await this.firestoreService.getUserById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Since Firestore does not have native update functionality like SQL databases, we'll perform a delete and create
    await this.firestoreService.deleteUser(id);
    return await this.firestoreService.addUser(updateUserDto);
  }

  async remove(id: string) {
    return await this.firestoreService.deleteUser(id);
  }
}
