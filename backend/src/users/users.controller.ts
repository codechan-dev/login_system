// src/users/users.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    const users = await this.usersService.findAll();
    // Exclude passwords from the response
    return users.map(user => ({ id: user.id, username: user.username }));
  }
}
