// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const existingUser = await this.authService['usersService'].findOne(body.username);
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }
    const user = await this.authService.register(body.username, body.password);
    return { id: user.id, username: user.username };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.login(user);
    return token;
  }
}
