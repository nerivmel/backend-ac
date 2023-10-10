import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productor } from './productor.entity';
import { CreateProductorDTO } from './productor.create.dto';

@Injectable()
export class ProductorService {
  constructor(
    @InjectRepository(Productor)
    private readonly productorRepository: Repository<Productor>,
  ) {}

  async findAll(): Promise<Productor[]> {
    return await this.productorRepository.find();
  }

  async findOne(id: number): Promise<Productor> {
    try {
      const productor = await this.productorRepository.findOne({
        where: { id },
      });

      if (!productor) {
        throw new NotFoundException(`Productor con ID ${id} no encontrado`);
      }

      return productor;
    } catch (error) {
      throw new HttpException(
        'Error el id ingresado no existe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createProductorDto: CreateProductorDTO): Promise<string> {
    try {
      const existingRegister = await this.productorRepository.findOne({
        where: [
          { correo: createProductorDto.correo },
          { nit: createProductorDto.nit },
        ],
      });

      if (existingRegister) {
        throw new HttpException(
          'Correo o nit ya registrados.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newProductor = this.productorRepository.create(createProductorDto);
      await this.productorRepository.save(newProductor);

      return 'Productor registrado con éxito';
    } catch (error) {
      throw new HttpException(
        'Error al registrar productor. Correo o nit duplicados.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    createProductorDto: CreateProductorDTO,
  ): Promise<string> {
    try {
      await this.productorRepository.update(id, createProductorDto);
      return 'Productor modificado con éxito';
    } catch (error) {
      throw new HttpException(
        'Error al actualizar el Productor.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number): Promise<void> {
    await this.productorRepository.delete(id);
  }
}
