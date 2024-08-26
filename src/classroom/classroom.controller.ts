import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { AuthGuard } from '../auth/auth.guard';
import { Classroom as ClassroomModel } from '@prisma/client';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @UseGuards(AuthGuard)
  @Get('user-classroom')
  async getUserClassroom(@Request() request): Promise<ClassroomModel[]> {
    return this.classroomService.classrooms({
      where: {
        users: {
          every: {
            id: request.user.sub,
          },
        },
      },
    });
  }

  @UseGuards(AuthGuard)
  @Get('users-in-classroom/:id')
  async getUsersInClassroom(@Param('id') id: string) {
    return this.classroomService.classroom({ id }, { users: true });
  }

  @UseGuards(AuthGuard)
  @Post('')
  async createClassroom(
    @Request() request,
    @Body()
    classroomData: {
      name: string;
      description: string;
      code: string;
    },
  ): Promise<ClassroomModel> {
    const { name, description, code } = classroomData;

    return this.classroomService.createClass({
      name,
      description,
      code,
      users: {
        connect: {
          id: request.user.sub,
        },
      },
    });
  }
}
