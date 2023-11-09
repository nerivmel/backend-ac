import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialgestorController } from './materialgestor.controller';
import { MaterialgestorService } from './materialgestor.service';
import { MaterialGestor } from './materialgestor.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialGestor, Gestor, Transformador])],
  controllers: [MaterialgestorController],
  providers: [MaterialgestorService],
  exports: [MaterialgestorService],
})
export class MaterialgestorModule {}
