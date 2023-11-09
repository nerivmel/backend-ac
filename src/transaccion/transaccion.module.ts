import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransaccionController } from './transaccion.controller';
import { TransaccionService } from './transaccion.service';
import { Transaccion } from './transaccion.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaccion, Gestor, Transformador])],
  controllers: [TransaccionController],
  providers: [TransaccionService],
  exports: [TransaccionService],
})
export class TransaccionModule {}
