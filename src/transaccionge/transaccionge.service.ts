import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaccionge } from './transaccionge.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { CreateTransacciongeDto } from './transaccionge.dto';

@Injectable()
export class TransacciongeService {
  constructor(
    @InjectRepository(Transaccionge)
    private transacciongeRepository: Repository<Transaccionge>,
    @InjectRepository(Gestor)
    private gestorRepository: Repository<Gestor>,
  ) {}

  async createTransaccionge(
    createTransacciongeDto: CreateTransacciongeDto,
  ): Promise<Transaccionge> {
    const {
      material,
      cantidad,
      fecha,
      gestorId,
      descripcion,
      ubicacion,
      entidad_externa,
    } = createTransacciongeDto;

    const gestor = await this.gestorRepository.findOne({
      where: { id: gestorId },
    });

    if (!gestor) {
      throw new NotFoundException(`El gestor con ID ${gestorId} no existe.`);
    }

    const transaccionge = new Transaccionge();
    transaccionge.material = material;
    transaccionge.cantidad = cantidad;
    transaccionge.fecha = fecha;
    transaccionge.gestor = gestor;
    transaccionge.descripcion = descripcion;
    transaccionge.ubicacion = ubicacion;
    transaccionge.entidad_externa = entidad_externa;

    try {
      return await this.transacciongeRepository.save(transaccionge);
    } catch (error) {
      throw new BadRequestException('No se pudo crear la transacción.');
    }
  }

  async deleteTransaccionge(id: number): Promise<void> {
    await this.transacciongeRepository.delete(id);
  }
}
