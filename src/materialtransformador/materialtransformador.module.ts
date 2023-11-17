// material-transformador.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialtransformadorController } from './materialtransformador.controller';
import { MaterialtransformadorService } from './materialtransformador.service';
import { MaterialTransformador } from './materialtransformador.entity';
import { Material } from 'src/material/material.entity'; // Asegúrate de que la ruta sea correcta
import { Transformador } from 'src/transformador/transformador.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialTransformador, Material, Transformador]),
  ],
  controllers: [MaterialtransformadorController],
  providers: [MaterialtransformadorService],
  exports: [MaterialtransformadorService],
})
export class MaterialTransformadorModule {}
