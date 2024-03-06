import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const exampleCreateUserDto: CreateUserDto = {
  email: 'example@example.com',
  phoneNumber: '1234567890',
  displayName: 'John Doe',
  photoURL: 'https://example.com/photo.jpg',
  // providerId: 'firebase',
  uid: 'asfv13413fsaofk',
  emailVerified: true,
  isAnonymous: false,
  // tenantId: 'tenantIdValue',
  // refreshToken: 'refreshTokenValue',
};

export class CreateUserDto {
  @ApiProperty({ example: exampleCreateUserDto.email })
  @IsEmail()
  email: string;

  @ApiProperty({ example: exampleCreateUserDto.phoneNumber })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: exampleCreateUserDto.displayName })
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiProperty({ example: exampleCreateUserDto.photoURL })
  @IsString()
  @IsOptional()
  photoURL?: string;

  // @ApiProperty({ example: exampleCreateUserDto.providerId })
  // @IsString()
  // providerId: string;

  @ApiProperty({ example: exampleCreateUserDto.uid })
  @IsString()
  uid: string;

  @ApiProperty({ example: exampleCreateUserDto.emailVerified })
  @IsNotEmpty()
  emailVerified: boolean;

  @ApiProperty({ example: exampleCreateUserDto.isAnonymous })
  @IsNotEmpty()
  isAnonymous: boolean;

  // @ApiProperty({ example: exampleCreateUserDto.tenantId })
  // @IsString()
  // @IsOptional()
  // tenantId?: string;

  // @ApiProperty({ example: exampleCreateUserDto.refreshToken })
  // @IsString()
  // refreshToken: string;
}
