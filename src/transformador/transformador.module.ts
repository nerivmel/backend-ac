import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransformadorController } from './transformador.controller';
import { TransformadorService } from './transformador.service';
import { Transformador } from './transformador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transformador])],
  controllers: [TransformadorController],
  providers: [TransformadorService],
  exports: [TransformadorService],
})
export class TransformadorModule {}
