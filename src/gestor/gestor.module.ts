import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GestorController } from './gestor.controller';
import { GestorService } from './gestor.service';
import { Gestor } from './gestor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gestor])],
  controllers: [GestorController],
  providers: [GestorService],
  exports: [GestorService],
})
export class GestorModule {}
