import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { CustomAuthGuard } from 'src/auth/guard/custom.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Auth()
  @Get()
  async me(@Req() req: any) {
    const userId = req.user.uid;
    console.log(14124124, userId);
    const userDetail = await this.usersService.getUserByUid(userId);
    return userDetail;
  }

  @UseGuards(CustomAuthGuard)
  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uid, updateUserDto);
  }

  @UseGuards(CustomAuthGuard)
  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.usersService.remove(uid);
  }
}
