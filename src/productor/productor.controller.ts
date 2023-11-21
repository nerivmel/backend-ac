import {
  Controller,
  Get,
  Delete,
  Param,
  Body,
  Post,
  //Body,
} from '@nestjs/common';
import { CreateProductorDTO } from './productor.create.dto';
//import { ProductorDTO } from './productor.dto';
import { ProductorService } from './productor.service';
//import { Productor } from './productor.entity';
import { ApiTags } from '@nestjs/swagger';
//import { Productor } from './productor.entity';
//import { ProductorDTO } from './productor.dto';

@ApiTags('productor')
@Controller('productor')
export class ProductorController {
  constructor(private productorService: ProductorService) {}

  @Get()
  findAll() {
    return this.productorService.findAll();
  }

  @Get('total')
  async obtenerProductoresConTotales(): Promise<any[]> {
    return this.productorService.obtenerProductoresConTotales();
  }
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.productorService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') userId) {
    return this.productorService.remove(userId);
  }
  @Post('/registrar')
  async create(@Body() productorDto: CreateProductorDTO) {
    return await this.productorService.create(productorDto);
  }
}
