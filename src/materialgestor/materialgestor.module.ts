import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialGestorController } from './materialgestor.controller';
import { MaterialGestorService } from './materialgestor.service';
import { MaterialGestor } from './materialgestor.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';
import { Transaccion } from 'src/transaccion/transaccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaterialGestor,
      Gestor,
      Transformador,
      Transaccion,
    ]),
  ],
  controllers: [MaterialGestorController],
  providers: [MaterialGestorService],
  exports: [MaterialGestorService],
})
export class MaterialgestorModule {}
