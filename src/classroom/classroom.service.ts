import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Classroom, Prisma } from '@prisma/client';

@Injectable()
export class ClassroomService {
  constructor(private prisma: PrismaService) {}

  async classroom(
    where: Prisma.ClassroomWhereUniqueInput,
    select?: Prisma.ClassroomSelect,
  ): Promise<Classroom> {
    return this.prisma.classroom.findUnique({
      where,
      select,
    });
  }

  async classrooms(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClassroomWhereUniqueInput;
    where?: Prisma.ClassroomWhereInput;
    orderBy?: Prisma.ClassroomOrderByWithRelationInput;
  }): Promise<Classroom[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.classroom.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createClass(data: Prisma.ClassroomCreateInput): Promise<Classroom> {
    return this.prisma.classroom.create({
      data,
    });
  }
}
