import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductorController } from './productor.controller';
import { ProductorService } from './productor.service';
import { Productor } from './productor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Productor])],
  controllers: [ProductorController],
  providers: [ProductorService],
  exports: [ProductorService],
})
export class ProductorModule {}
