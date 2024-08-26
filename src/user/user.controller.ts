import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async getUsers() {
    return this.userService.users({});
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({
      id,
    });
  }

  @Post('user')
  async createUser(
    @Body()
    userData: {
      email: string;
      password: string;
      name: string;
      role: string;
    },
  ): Promise<UserModel> {
    const { email, password, name, role } = userData;
    const hashPassword = await bcrypt.hash(password, 10);

    return this.userService.createUser({
      email,
      password: hashPassword,
      name,
      role,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    userData: {
      email?: string;
      password?: string;
      name?: string;
      role?: string;
    },
  ): Promise<UserModel> {
    const { email, password, name, role } = userData;
    return this.userService.updateUser({
      where: {
        id,
      },
      data: {
        email,
        password,
        name,
        role,
      },
    });
  }

  @UseGuards(AuthGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({
      id,
    });
  }
}
