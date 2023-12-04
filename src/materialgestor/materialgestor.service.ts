import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialGestor } from './materialgestor.entity';
import { Transaccion } from 'src/transaccion/transaccion.entity';

@Injectable()
export class MaterialGestorService {
  constructor(
    @InjectRepository(MaterialGestor)
    private readonly materialGestorRepository: Repository<MaterialGestor>,
    @InjectRepository(Transaccion)
    private readonly transaccionRepository: Repository<Transaccion>,
  ) {}

  async obtenerFechasYCantidadesPorGestor(gestorId: number): Promise<any[]> {
    const resultados = await this.materialGestorRepository
      .createQueryBuilder('materialGestor')
      .leftJoinAndSelect('materialGestor.transaccion', 'transaccion')
      .where('materialGestor.gestor.id = :gestorId', { gestorId })
      .select([
        'transaccion.fecha',
        'SUM(materialGestor.cantidad) as cantidadComerciada',
      ])
      .groupBy('transaccion.fecha')
      .getRawMany();

    return resultados;
  }
}
