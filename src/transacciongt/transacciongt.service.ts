import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transacciongt } from './transacciongt.entity';
import { CreateTransacciongtDto } from './transacciongt.dto';
import { Material } from 'src/material/material.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Injectable()
export class TransacciongtService {
  constructor(
    @InjectRepository(Transacciongt)
    private transacciongtRepository: Repository<Transacciongt>,
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(Gestor)
    private gestorRepository: Repository<Gestor>,
    @InjectRepository(Transformador)
    private transformadorRepository: Repository<Gestor>,
  ) {}

  async createTransacciongt(
    createTransacciongtDto: CreateTransacciongtDto,
  ): Promise<Transacciongt> {
    const {
      gestorId,
      transformadorId,
      materialId,
      cantidad,
      fecha,
      descripcion,
      ubicacion,
    } = createTransacciongtDto;

    // Verifica si el gestor existe en la base de datos
    const gestor = await this.gestorRepository.findOne({
      where: { id: gestorId },
    });
    if (!gestor) {
      throw new NotFoundException(`El gestor con ID ${gestorId} no existe.`);
    }

    // Verifica si el transformador existe en la base de datos
    const transformador = await this.transformadorRepository.findOne({
      where: { id: transformadorId },
    });
    if (!transformador) {
      throw new NotFoundException(
        `El transformador con ID ${transformadorId} no existe.`,
      );
    }

    // Verifica si el material existe en la base de datos
    const material = await this.materialRepository.findOne({
      where: { id: materialId },
    });
    if (!material) {
      throw new NotFoundException(
        `El material con ID ${materialId} no existe.`,
      );
    }

    // Verifica si el gestor tiene suficiente material disponible
    if (material.cantidad < cantidad) {
      throw new BadRequestException(
        'El gestor no tiene suficiente material disponible.',
      );
    }

    // Crear una nueva instancia de Material asignado al transformador
    const nuevoMaterialTransformador = this.materialRepository.create({
      nombre: material.nombre,
      cantidad: cantidad,
      descripcion: descripcion,
      fecha_adquirido: fecha,
      transformador: transformador,
    });

    try {
      // Guarda el nuevo material asignado al transformador en la base de datos
      await this.materialRepository.save(nuevoMaterialTransformador);

      // Actualiza la cantidad de material del gestor restando la cantidad involucrada
      material.cantidad -= cantidad;
      await this.materialRepository.save(material);

      // Crea una nueva instancia de Transacciongt
      const transacciongt = this.transacciongtRepository.create({
        gestor: gestor,
        transformador: transformador,
        material: nuevoMaterialTransformador,
        cantidad: cantidad,
        fecha: fecha,
        descripcion: descripcion,
        ubicacion: ubicacion,
      });

      // Guarda la nueva transacción en la base de datos
      return await this.transacciongtRepository.save(transacciongt);
    } catch (error) {
      throw new BadRequestException(
        'No se pudo crear la transacción o el material.',
      );
    }
  }

  async getAllTransacciongt(): Promise<Transacciongt[]> {
    return this.transacciongtRepository
      .createQueryBuilder('transacciongt')
      .leftJoinAndSelect('transacciongt.gestor', 'gestor')
      .leftJoinAndSelect('transacciongt.transformador', 'transformador')
      .getMany();
  }
}
