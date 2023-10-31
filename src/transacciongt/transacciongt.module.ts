import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacciongtService } from './transacciongt.service';
import { TransacciongtController } from './transacciongt.controller';
import { Transacciongt } from './transacciongt.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Material } from 'src/material/material.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transacciongt, Gestor, Material, Transformador]),
  ],
  controllers: [TransacciongtController],
  providers: [TransacciongtService],
  exports: [TransacciongtService],
})
export class TransacciongtModule {}
