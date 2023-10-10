import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transformador } from './transformador.entity';
import { CreateTransformadorDto } from './transformador.dto';

@Injectable()
export class TransformadorService {
  constructor(
    @InjectRepository(Transformador)
    private readonly transformadorRepository: Repository<Transformador>,
  ) {}

  async findAll(): Promise<Transformador[]> {
    return await this.transformadorRepository.find();
  }

  async findOne(id: number): Promise<Transformador> {
    try {
      const transformador = await this.transformadorRepository.findOne({
        where: { id },
      });

      if (!transformador) {
        throw new NotFoundException(`Transformador con ID ${id} no encontrado`);
      }

      return transformador;
    } catch (error) {
      throw new HttpException(
        'Error: el ID ingresado no existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createTransformadorDto: CreateTransformadorDto,
  ): Promise<string> {
    try {
      const existingRegister = await this.transformadorRepository.findOne({
        where: [
          { correo: createTransformadorDto.correo },
          { nit: createTransformadorDto.nit },
        ],
      });

      if (existingRegister) {
        throw new HttpException(
          'Correo o nit ya registrados.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newTransformador = this.transformadorRepository.create(
        createTransformadorDto,
      );
      await this.transformadorRepository.save(newTransformador);

      return 'Transformador registrado con éxito';
    } catch (error) {
      throw new HttpException(
        'Error al registrar transformador. Correo o nit duplicados.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    createTransformadorDto: CreateTransformadorDto,
  ): Promise<string> {
    try {
      await this.transformadorRepository.update(id, createTransformadorDto);
      return 'Transformador modificado con éxito';
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el Transformador.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<void> {
    const transformador = await this.transformadorRepository.findOne({
      where: { id },
    });
    if (!transformador) {
      throw new Error('Transformador no encontrado');
    }

    await this.transformadorRepository.remove(transformador);
  }
}
