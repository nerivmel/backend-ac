/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaccion } from './transaccion.entity';
import { CreateTransaccionDto } from './transaccion.dto';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';
import { Material } from 'src/material/material.entity';
import { TransaccionMaterial } from 'src/transaccionmaterial/transaccionmaterial.entity';
import { MaterialGestor } from 'src/materialgestor/materialgestor.entity';

@Injectable()
export class TransaccionService {
  constructor(
    @InjectRepository(Transaccion)
    private readonly transaccionRepository: Repository<Transaccion>,
    @InjectRepository(Gestor)
    private readonly gestorRepository: Repository<Gestor>,
    @InjectRepository(Transformador)
    private readonly transformadorRepository: Repository<Transformador>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(TransaccionMaterial)
    private readonly transaccionMaterialRepository: Repository<TransaccionMaterial>,
    @InjectRepository(MaterialGestor)
    private readonly materialGestorRepository: Repository<MaterialGestor>,
  ) {}

  async crearTransaccion(
    createTransaccionDto: CreateTransaccionDto,
  ): Promise<Transaccion> {
    const {
      gestor_realiza,
      gestor_recibe,
      transformador,
      fecha,
      observaciones,
      archivoPng,
      nro_anla,
      nro_factura,
      entidad_externa,
      material,
      cantidad,
    } = createTransaccionDto;
  
    this.validarRestricciones(
      gestor_realiza,
      gestor_recibe,
      transformador,
      entidad_externa,
    );
  
    const gestorRealiza = gestor_realiza
      ? await this.gestorRepository.findOne({ where: { id: gestor_realiza } })
      : null;
  
    const gestorRecibe = gestor_recibe
      ? await this.gestorRepository.findOne({ where: { id: gestor_recibe } })
      : null;
  
    const transformadorObj = transformador
      ? await this.transformadorRepository.findOne({
          where: { id: transformador },
        })
      : null;
  
    const transaccion = new Transaccion();
    transaccion.gestor_realiza = gestorRealiza;
    transaccion.gestor_recibe = gestorRecibe;
    transaccion.transformador = transformadorObj;
    transaccion.fecha = fecha;
    transaccion.observaciones = observaciones;
    transaccion.archivoPng = archivoPng;
    transaccion.nro_anla = nro_anla;
    transaccion.nro_factura = nro_factura;
    transaccion.entidad_externa = entidad_externa;
  
    try {
      // Guardar la transacción en la base de datos
      const nuevaTransaccion = await this.transaccionRepository.save(transaccion);
  
      // Separar los materiales y cantidades proporcionados
      const materiales = material.split(',').map((m) => m.trim());
      const cantidades = cantidad.split(',').map(Number);
  
      // Guardar los registros en la tabla TransaccionMaterial
      for (let i = 0; i < materiales.length; i++) {
        const materialNombre = materiales[i];
        const cantidad = cantidades[i];
  
        // Obtener o crear el material de la base de datos
        let materialEntity = await this.materialRepository.findOne({
          where: { nombre: materialNombre },
        });
  
        if (!materialEntity) {
          materialEntity = new Material();
          materialEntity.nombre = materialNombre;
          materialEntity.cantidad_total = cantidad; // Iniciar con la cantidad
          materialEntity.descripcion = '';
          await this.materialRepository.save(materialEntity);
        } else {
          // Sumar la cantidad a cantidad_total en cada transacción
          materialEntity.cantidad_total += cantidad;
          await this.materialRepository.save(materialEntity);
        }
  
        // Crear un nuevo registro en la tabla TransaccionMaterial
        const transaccionMaterial = new TransaccionMaterial();
        transaccionMaterial.transaccion = nuevaTransaccion;
        transaccionMaterial.material = materialEntity;
        transaccionMaterial.cantidad = cantidad;
  
        // Guardar el registro en la base de datos
        await this.transaccionMaterialRepository.save(transaccionMaterial);
  
        // Verificar si existe un registro en MaterialGestor con el mismo material_id y gestor_id
        const materialGestorExistente = await this.materialGestorRepository.findOne({
          where: { material: materialEntity, gestor: gestorRecibe },
        });
  
        if (materialGestorExistente) {
          // Si existe, sumar la cantidad
          materialGestorExistente.cantidad += cantidad;
          await this.materialGestorRepository.save(materialGestorExistente);
        } else {
          // Si no existe, crear un nuevo registro en la tabla MaterialGestor
          const materialGestorNuevo = new MaterialGestor();
          materialGestorNuevo.material = materialEntity;
          materialGestorNuevo.gestor = gestorRecibe;
          materialGestorNuevo.cantidad = cantidad;
          materialGestorNuevo.descripcion = ''; // Puedes ajustar esto según tus necesidades
  
          await this.materialGestorRepository.save(materialGestorNuevo);
        }
      }
  
      return nuevaTransaccion;
    } catch (error) {
      throw new BadRequestException('No se pudo crear la transacción.');
    }
  }
  
  
  
  private validarRestricciones(gestor_realiza: number, gestor_recibe: number, transformador: number, entidad_externa: string): void {
    // Restricción 1
    if (entidad_externa && gestor_recibe) {
      return
    }
  
    // Restricción 2
    if (gestor_realiza && gestor_recibe && !transformador && gestor_realiza !== gestor_recibe) {
      // Esta combinación es válida (gestor_realiza con gestor_recibe y gestor_realiza no es el mismo que gestor_recibe)
      return;
    }
  
    // Restricción 3
    if (gestor_realiza && transformador && !gestor_recibe && !entidad_externa) {
      // Esta combinación es válida (gestor_realiza con transformador)
      return;
    }
  
    // Si llegamos aquí, entonces la combinación no es válida
    throw new BadRequestException('No se permiten transacciones entre el mismo gestor o ingreso una transaccion invalida');
  }
}
