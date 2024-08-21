import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('auth/sign-in')
  async signIn(@Body() signInData: { email: string; password: string }) {
    const { email, password } = signInData;
    return this.authService.signIn(email, password);
  }

  @Post('auth/sign-up')
  async signUp(
    @Body()
    signUpData: {
      email: string;
      password: string;
      name: string;
      role: string;
    },
  ) {
    const { email, password, name, role } = signUpData;
    const hashPassword = await bcrypt.hash(password, 10);
    return this.authService.signUp({
      email,
      password: hashPassword,
      name,
      role,
    });
  }
}
