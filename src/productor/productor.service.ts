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

      return 'productor registrado con éxito';
    } catch (error) {
      throw new HttpException(
        'error al registrar productor correo o nit duplicados',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    productorData: Partial<Productor>,
  ): Promise<Productor | undefined> {
    await this.productorRepository.update(id, productorData);
    return await this.productorRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.productorRepository.delete(id);
  }
}
