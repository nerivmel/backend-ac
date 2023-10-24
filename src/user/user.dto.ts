import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  apellidos: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  rol: string;
}
