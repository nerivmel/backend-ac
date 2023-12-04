import { Controller, Get } from '@nestjs/common';
import { MaterialProductorService } from './materialproductor.service';

@Controller('material-productores')
export class MaterialProductorController {
  constructor(
    private readonly materialProductorService: MaterialProductorService,
  ) {}

  @Get('pc')
  async getProductoresConCantidades() {
    try {
      const productoresConCantidades =
        await this.materialProductorService.getAllProductoresConCantidades();
      return { success: true, data: productoresConCantidades };
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener productores con cantidades',
      };
    }
  }
  @Get('total')
  async sumarCantidadesPorProductores() {
    try {
      const resultados =
        await this.materialProductorService.sumarCantidadesPorProductores();
      return { success: true, data: resultados };
    } catch (error) {
      return {
        success: false,
        message: 'Error al sumar cantidades por productores',
      };
    }
  }
}
