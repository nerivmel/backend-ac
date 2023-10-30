import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './material.entity';
import { CreateMaterialDto } from './create.material.dto';
import { Gestor } from 'src/gestor/gestor.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(Gestor)
    private gestorRepository: Repository<Gestor>,
  ) {}

  async getMaterialesByGestor(gestorId: number): Promise<Material[]> {
    return this.materialRepository.find({
      where: {
        gestor: { id: gestorId },
      },
    });
  }
  async createMaterial(
    createMaterialDto: CreateMaterialDto,
  ): Promise<Material> {
    const { nombre, cantidad, descripcion, fecha_adquirido, gestorId } =
      createMaterialDto;

    // Verifica si el gestor existe en la base de datos
    const gestor = await this.gestorRepository.findOne({
      where: { id: gestorId },
    });

    if (!gestor) {
      throw new NotFoundException(`El gestor con ID ${gestorId} no existe.`);
    }

    // Crea una nueva instancia de Material
    const material = this.materialRepository.create({
      nombre,
      cantidad,
      descripcion,
      fecha_adquirido,
      gestor: gestor, // Asigna el gestor al material
    });

    try {
      // Guarda el nuevo material en la base de datos
      return await this.materialRepository.save(material);
    } catch (error) {
      throw new BadRequestException('No se pudo crear el material.');
    }
  }
}
