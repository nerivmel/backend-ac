import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { GestorModule } from './gestor/gestor.module';
import { TransformadorModule } from './transformador/transformador.module';
import { ProductorModule } from './productor/productor.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GestorModule,
    TransformadorModule,
    ProductorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
