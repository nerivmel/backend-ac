import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gestor } from './gestor.entity';
import { CreateGestorDto } from './gestor.dto'; // Importa el DTO
import { CreateGestorDTO } from './create.gestor.dto';

@Injectable()
export class GestorService {
  constructor(
    @InjectRepository(Gestor)
    private readonly gestorRepository: Repository<Gestor>,
  ) {}

  async findAll(): Promise<Gestor[]> {
    return await this.gestorRepository.find();
  }

  async findOne(id: number): Promise<Gestor> {
    try {
      const gestor = await this.gestorRepository.findOne({
        where: { id },
      });

      if (!gestor) {
        throw new NotFoundException(`Gestor con ID ${id} no encontrado`);
      }

      return gestor;
    } catch (error) {
      throw new HttpException(
        'Error el id ingresado no existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createGestorDto: CreateGestorDTO): Promise<string> {
    try {
      const existingRegister = await this.gestorRepository.findOne({
        where: [
          { correo: createGestorDto.correo },
          { nit: createGestorDto.nit },
        ],
      });

      if (existingRegister) {
        throw new HttpException(
          'Correo o nit ya registrados.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newGestor = this.gestorRepository.create(createGestorDto);
      await this.gestorRepository.save(newGestor);

      return 'Gestor registrado con éxito';
    } catch (error) {
      throw new HttpException(
        'Error al registrar el gestor. Correo o nit duplicados.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, createGestorDto: CreateGestorDto): Promise<string> {
    try {
      await this.gestorRepository.update(id, createGestorDto);
      return 'Gestor modificado con éxito';
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el Gestor.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<void> {
    await this.gestorRepository.delete(id);
  }
}
