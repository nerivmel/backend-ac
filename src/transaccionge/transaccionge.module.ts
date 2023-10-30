import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacciongeController } from './transaccionge.controller';
import { TransacciongeService } from './transaccionge.service';
import { Transaccionge } from './transaccionge.entity';
import { Gestor } from 'src/gestor/gestor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaccionge, Gestor])],
  controllers: [TransacciongeController],
  providers: [TransacciongeService],
  exports: [TransacciongeService],
})
export class TransacciongeModule {}
