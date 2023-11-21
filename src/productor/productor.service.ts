import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productor } from './productor.entity';
import { CreateProductorDTO } from './productor.create.dto';
import { MaterialProductor } from 'src/materialproductor/materialproductor.entity';
import { Material } from 'src/material/material.entity';

@Injectable()
export class ProductorService {
  constructor(
    @InjectRepository(Productor)
    private readonly productorRepository: Repository<Productor>,
    @InjectRepository(MaterialProductor)
    private readonly materialProductorRepository: Repository<MaterialProductor>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
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
      // Verificar si ya existe un registro con el mismo correo o NIT
      const existingRegister = await this.productorRepository.findOne({
        where: [
          { correo: createProductorDto.correo },
          { nit: createProductorDto.nit },
        ],
      });

      if (existingRegister) {
        throw new BadRequestException('Correo o NIT ya registrados.');
      }

      // Crear un nuevo productor
      const newProductor = this.productorRepository.create(createProductorDto);
      await this.productorRepository.save(newProductor);

      // Separar los materiales y cantidades proporcionados
      const materiales = createProductorDto.material
        .split(',')
        .map((m) => m.trim());
      const cantidades = createProductorDto.cantidad.split(',').map(Number); // Convertir a números

      // Guardar materiales y cantidades en la tabla materialproductor
      if (materiales.length === cantidades.length) {
        for (let i = 0; i < materiales.length; i++) {
          // Verificar si el material ya existe en la base de datos
          let materialEntity = await this.materialRepository.findOne({
            where: { nombre: materiales[i] },
          });

          if (!materialEntity) {
            materialEntity = new Material();
            materialEntity.nombre = materiales[i];
            // Otros campos relacionados con Material
            await this.materialRepository.save(materialEntity);
          }

          const materialProductor = new MaterialProductor();
          materialProductor.material = materialEntity;
          materialProductor.cantidad = cantidades[i];
          materialProductor.productor = newProductor;
          await this.materialProductorRepository.save(materialProductor);
        }
      } else {
        throw new BadRequestException(
          'La cantidad de materiales no coincide con la cantidad de cantidades proporcionadas.',
        );
      }

      return 'Productor registrado con éxito';
    } catch (error) {
      console.error(error); // Imprimir el error en la consola para debug
      throw new BadRequestException(
        'Error al registrar productor. Por favor, verifica los datos proporcionados.',
      );
    }
  }
  async obtenerProductoresConTotales(): Promise<any[]> {
    const productores = await this.productorRepository.find();

    const result = await Promise.all(
      productores.map(async (productor) => {
        const totalCantidades = await this.obtenerTotalCantidades(productor.id);
        return {
          ...productor,
          totalCantidades,
        };
      }),
    );

    return result;
  }

  private async obtenerTotalCantidades(idProductor: number): Promise<number> {
    const materialProductorEntries =
      await this.materialProductorRepository.find({
        where: { productor: { id: idProductor } },
      });

    // Sumar todas las cantidades
    const totalCantidades = materialProductorEntries.reduce(
      (total, entry) => total + entry.cantidad,
      0,
    );

    return totalCantidades;
  }

  async remove(id: number): Promise<void> {
    await this.productorRepository.delete(id);
  }
}
