import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MockSignInInput {
  @ApiProperty({
    type: String,
    description: 'publicAddress',
    required: true,
    example: 'farm_inw@hotmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
    example: '111111',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInWithEmailInput {
  @ApiProperty({
    type: String,
    description: 'publicAddress',
    required: true,
    example: 'example@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpWithEmailInput {
  @ApiProperty({
    type: String,
    description: 'userName',
    required: true,
    example: 'john doe',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    type: String,
    description: 'publicAddress',
    required: true,
    example: 'example@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
