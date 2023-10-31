import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { Material } from './material.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Gestor, Transformador])],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}
