import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [UserModule, AuthModule, ClassroomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
