import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductorController } from './productor.controller';
import { ProductorService } from './productor.service';
import { Productor } from './productor.entity';
import { Material } from 'src/material/material.entity';
import { MaterialProductor } from 'src/materialproductor/materialproductor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productor, Material, MaterialProductor])],
  controllers: [ProductorController],
  providers: [ProductorService],
  exports: [ProductorService],
})
export class ProductorModule {}
