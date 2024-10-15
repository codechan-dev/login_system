// src/user/user.controller.ts

import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.register(registerDto.username, registerDto.password);
    return { message: 'User registered successfully', userId: user.id };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  async login(@Body() loginDto: LoginDto) {
    console.log('Login Request Body:', loginDto); // Add this line
    
    const user = await this.userService.findOne(loginDto.username);
    if (!user) {
      return { message: 'Invalid credentials' };
    }

    console.log('Retrieved User from DB:', user); // Add this line

    const valid = await bcrypt.compare(loginDto.password, user.password);
    if (!valid) {
      return { message: 'Invalid credentials' };
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get list of users (protected)' })
  @ApiResponse({ status: 200, description: 'List of users.' })
  async findAll(@Request() req) {
    return this.userService.findAll();
  }
}
