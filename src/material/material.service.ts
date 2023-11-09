import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from './material.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialRepository: Repository<Material>,
    @InjectRepository(Gestor)
    private gestorRepository: Repository<Gestor>,
    @InjectRepository(Transformador)
    private transformadorRepository: Repository<Gestor>,
  ) {}

  async getAllMaterials(): Promise<Material[]> {
    return this.materialRepository.find();
  }
}
