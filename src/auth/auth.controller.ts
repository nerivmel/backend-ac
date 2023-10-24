import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth/login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user) {
    return this.authService.login(user.email, user.password);
  }
}
