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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorator/auth.decorator';
import { CustomAuthGuard } from 'src/auth/guard/custom.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Auth()
  @Get()
  async me(@Req() req: any) {
    const userId = req.user.uid;
    const userDetail = await this.userService.getUserByUid(userId);
    return userDetail;
  }

  @UseGuards(CustomAuthGuard)
  @Patch(':uid')
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uid, updateUserDto);
  }

  @UseGuards(CustomAuthGuard)
  @Delete(':uid')
  remove(@Param('uid') uid: string) {
    return this.userService.remove(uid);
  }
}
