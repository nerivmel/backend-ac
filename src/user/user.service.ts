import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(newUser: UserDTO) {
    const usersR = this.usersRepository;
    try {
      const passwordHash = await bcrypt.hash(newUser.password, 10);
      newUser.password = passwordHash;
      await usersR.save(newUser);
      return {
        message: 'Usuario registrado con éxito',
        email: newUser.email,
        password: passwordHash,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al crear el usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUser(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
