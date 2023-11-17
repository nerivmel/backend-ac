/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionController } from './transaccion.controller';
import { TransaccionService } from './transaccion.service';
import { Transaccion } from './transaccion.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';
import { Material } from 'src/material/material.entity';
import { TransaccionMaterial } from 'src/transaccionmaterial/transaccionmaterial.entity';
import { MaterialGestor } from 'src/materialgestor/materialgestor.entity';
import { MaterialTransformador } from 'src/materialtransformador/materialtransformador.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Transaccion, Gestor, Transformador, Material, TransaccionMaterial, MaterialGestor, MaterialTransformador])],
  controllers: [TransaccionController],
  providers: [TransaccionService],
  exports: [TransaccionService],
})
export class TransaccionModule {}
