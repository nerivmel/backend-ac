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
import { Material } from 'src/material/material.entity';

@Injectable()
export class TransacciongeService {
  constructor(
    @InjectRepository(Transaccionge)
    private transacciongeRepository: Repository<Transaccionge>,
    @InjectRepository(Gestor)
    private gestorRepository: Repository<Gestor>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
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

    if (gestorId === undefined) {
      throw new BadRequestException('El campo gestorId es obligatorio.');
    }
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
      const nuevaTransaccionge =
        await this.transacciongeRepository.save(transaccionge);

      const nuevoMaterial = new Material();
      nuevoMaterial.nombre = material;
      nuevoMaterial.cantidad = cantidad;
      nuevoMaterial.descripcion = descripcion;
      nuevoMaterial.fecha_adquirido = fecha;
      nuevoMaterial.gestor = gestor;

      await this.materialRepository.save(nuevoMaterial);

      return nuevaTransaccionge;
    } catch (error) {
      throw new BadRequestException(
        'No se pudo crear la transacción o el material.',
      );
    }
  }
  async deleteTransaccionge(id: number): Promise<void> {
    await this.transacciongeRepository.delete(id);
  }
  async getAllTransacciones(): Promise<Transaccionge[]> {
    return this.transacciongeRepository
      .createQueryBuilder('transaccionge')
      .leftJoinAndSelect('transaccionge.gestor', 'gestor')
      .getMany();
  }
}
