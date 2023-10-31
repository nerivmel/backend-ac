import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionggService } from './transacciongg.service';
import { TransaccionggController } from './transacciongg.controller';
import { Transacciongg } from './transacciongg.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Material } from 'src/material/material.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transacciongg, Gestor, Material])],
  controllers: [TransaccionggController],
  providers: [TransaccionggService],
  exports: [TransaccionggService],
})
export class TransaccionggModule {}
