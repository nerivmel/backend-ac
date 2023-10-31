import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transacciongg } from './transacciongg.entity';
import { CreateTransaccionggDto } from './transacciongg.dto';
import { Material } from '../material/material.entity';
import { Gestor } from '../gestor/gestor.entity';

@Injectable()
export class TransaccionggService {
  constructor(
    @InjectRepository(Transacciongg)
    private transaccionggRepository: Repository<Transacciongg>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(Gestor)
    private gestorRepository: Repository<Gestor>,
  ) {}

  async createTransacciongg(
    createTransaccionggDto: CreateTransaccionggDto,
  ): Promise<Transacciongg> {
    const {
      gestorRealizaId,
      gestorRecibeId,
      materialId,
      cantidad,
      fecha,
      descripcion,
      ubicacion,
    } = createTransaccionggDto;

    if (gestorRealizaId === gestorRecibeId) {
      throw new BadRequestException(
        'El gestor que realiza no puede ser el mismo que el gestor que recibe.',
      );
    }

    if (gestorRealizaId === undefined) {
      throw new BadRequestException('El campo gestorRealizaId es obligatorio.');
    }

    const gestorRealiza = await this.gestorRepository.findOne({
      where: { id: gestorRealizaId },
    });

    if (!gestorRealiza) {
      throw new NotFoundException(
        `El gestor con ID ${gestorRealizaId} no existe.`,
      );
    }

    if (gestorRecibeId === undefined) {
      throw new BadRequestException('El campo gestorRecibeId es obligatorio.');
    }

    const gestorRecibe = await this.gestorRepository.findOne({
      where: { id: gestorRecibeId },
    });

    if (!gestorRecibe) {
      throw new NotFoundException(
        `El gestor con ID ${gestorRecibeId} no existe.`,
      );
    }

    if (materialId === undefined) {
      throw new BadRequestException('El campo materialId es obligatorio.');
    }

    const material = await this.materialRepository.findOne({
      where: { id: materialId },
    });

    if (!material) {
      throw new NotFoundException(
        `El material con ID ${materialId} no existe.`,
      );
    }

    if (material.cantidad < cantidad) {
      throw new BadRequestException(
        'No hay suficiente cantidad de material disponible.',
      );
    }

    material.cantidad -= cantidad;

    const nuevoMaterial = this.materialRepository.create({
      nombre: material.nombre,
      cantidad: cantidad,
      descripcion: material.descripcion,
      fecha_adquirido: new Date(),
      gestor: gestorRecibe,
    });

    const transacciongg = this.transaccionggRepository.create({
      gestorRealiza: gestorRealiza,
      gestorRecibe: gestorRecibe,
      material: material,
      cantidad: cantidad,
      fecha: fecha,
      descripcion: descripcion,
      ubicacion: ubicacion,
    });

    try {
      return await this.transaccionggRepository.manager.transaction(
        async (transactionalEntityManager) => {
          await transactionalEntityManager.save(Material, material);
          await transactionalEntityManager.save(Material, nuevoMaterial);
          return await transactionalEntityManager.save(
            Transacciongg,
            transacciongg,
          );
        },
      );
    } catch (error) {
      throw new BadRequestException(
        'No se pudo crear la transacción o actualizar el material.',
      );
    }
  }
  async getAllTransacciones(): Promise<Transacciongg[]> {
    return this.transaccionggRepository.find();
  }
}
