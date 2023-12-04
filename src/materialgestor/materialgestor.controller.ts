import { Controller, Get, Param } from '@nestjs/common';
import { MaterialGestorService } from './materialgestor.service';

@Controller('material-gestores')
export class MaterialGestorController {
  constructor(private readonly materialGestorService: MaterialGestorService) {}

  @Get('estadistica/:gestorId')
  async obtenerFechasYCantidadesPorGestor(@Param('gestorId') gestorId: number) {
    try {
      const resultados =
        await this.materialGestorService.obtenerFechasYCantidadesPorGestor(
          gestorId,
        );
      return { success: true, data: resultados };
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener fechas y cantidades por gestor',
      };
    }
  }
}
