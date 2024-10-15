// src/user/dto/register.dto.ts

import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Username of the new user',
    example: 'john_doe',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'Password for the new user',
    example: 'StrongPassword123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
