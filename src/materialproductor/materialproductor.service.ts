import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialProductor } from './materialproductor.entity';
import { Productor } from 'src/productor/productor.entity';

@Injectable()
export class MaterialProductorService {
  constructor(
    @InjectRepository(MaterialProductor)
    private readonly materialProductorRepository: Repository<MaterialProductor>,
    @InjectRepository(Productor)
    private readonly productorRepository: Repository<Productor>,
  ) {}

  async getAllProductoresConCantidades(): Promise<any[]> {
    // Utiliza el repositorio para realizar la consulta
    const result = await this.materialProductorRepository
      .createQueryBuilder('materialProductor')
      .leftJoinAndSelect('materialProductor.material', 'material')
      .leftJoinAndSelect('materialProductor.productor', 'productor')
      .select([
        'productor.id as productorId',
        'productor.nombre as productorNombre',
        'materialProductor.cantidad as cantidad',
      ])
      .getRawMany();

    return result;
  }
  async sumarCantidadesPorProductores(): Promise<any[]> {
    const productores = await this.productorRepository.find();

    const resultados = await Promise.all(
      productores.map(async (productor) => {
        const sumatoria = await this.materialProductorRepository
          .createQueryBuilder('materialProductor')
          .where('materialProductor.productor.id = :productorId', {
            productorId: productor.id,
          })
          .select('SUM(materialProductor.cantidad)', 'sumatoria')
          .getRawOne();

        return {
          productorId: productor.id,
          productorNombre: productor.nombre,
          sumatoria: sumatoria.sumatoria || 0,
        };
      }),
    );

    return resultados;
  }
}
