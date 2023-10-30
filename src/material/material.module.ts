import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { Material } from './material.entity';
import { Gestor } from 'src/gestor/gestor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Gestor])],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [MaterialService],
})
export class MaterialModule {}
