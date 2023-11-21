import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialproductorController } from './materialproductor.controller';
import { MaterialProductor } from './materialproductor.entity';
import { MaterialproductorService } from './materialproductor.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaterialProductor])],
  controllers: [MaterialproductorController],
  providers: [MaterialproductorService],
  exports: [MaterialproductorService],
})
export class MaterialproductorModule {}
