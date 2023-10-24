import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);

    if (!user) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Credenciales inválidas',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      email: email,
      nombre: user.nombre,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      result: 'success',
      message: 'Bienvenido',
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(email);
    const match = await bcrypt.compare(pass, user.password);
    if (user && match) {
      const { ...result } = user;
      return result;
    }
  }
}
