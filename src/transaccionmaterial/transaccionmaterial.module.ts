import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransaccionmaterialController } from './transaccionmaterial.controller';
import { TransaccionmaterialService } from './transaccionmaterial.service';
import { TransaccionMaterial } from './transaccionmaterial.entity';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransaccionMaterial, Gestor, Transformador]),
  ],
  controllers: [TransaccionmaterialController],
  providers: [TransaccionmaterialService],
  exports: [TransaccionmaterialService],
})
export class TransaccionmaterialModule {}
