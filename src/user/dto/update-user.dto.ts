import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: '2142-as-124124-xv14212421' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'March 7, 2024 at 3:30:47 PM UTC+7' })
  @IsString()
  createdAt: Date;

  @ApiProperty({ example: 'March 7, 2024 at 3:30:47 PM UTC+7' })
  @IsString()
  updatedAt: Date;
}
