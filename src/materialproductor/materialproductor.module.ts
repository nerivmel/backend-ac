import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialProductorController } from './materialproductor.controller';
import { MaterialProductor } from './materialproductor.entity';
import { MaterialProductorService } from './materialproductor.service';
import { Productor } from 'src/productor/productor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialProductor, Productor])],
  controllers: [MaterialProductorController],
  providers: [MaterialProductorService],
  exports: [MaterialProductorService],
})
export class MaterialproductorModule {}
