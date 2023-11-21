/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaccion } from './transaccion.entity';
import { CreateTransaccionDto } from './transaccion.dto';
import { Gestor } from 'src/gestor/gestor.entity';
import { Transformador } from 'src/transformador/transformador.entity';
import { Material } from 'src/material/material.entity';
import { TransaccionMaterial } from 'src/transaccionmaterial/transaccionmaterial.entity';
import { MaterialGestor } from 'src/materialgestor/materialgestor.entity';
import { MaterialTransformador } from 'src/materialtransformador/materialtransformador.entity';
import { IsNull, Not, Repository } from 'typeorm';

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
    @InjectRepository(MaterialTransformador)
    private readonly materialTransformadorRepository: Repository<MaterialTransformador>,
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
      const cantidades = cantidad.split(',').map(Number); // Convertir a números
  
      // Guardar los registros en la tabla TransaccionMaterial
      for (let i = 0; i < materiales.length; i++) {
        const materialNombre = materiales[i];
        const cantidadMaterial = cantidades[i];
  
        // Obtener o crear el material de la base de datos
        let materialEntity = await this.materialRepository.findOne({
          where: { nombre: materialNombre },
        });
  
        if (!materialEntity) {
          materialEntity = new Material();
          materialEntity.nombre = materialNombre;
          materialEntity.cantidad_total = 0; // Iniciar con 0
          materialEntity.descripcion = '';
          await this.materialRepository.save(materialEntity);
        }
  
        // Crear un nuevo registro en la tabla TransaccionMaterial
        const transaccionMaterial = new TransaccionMaterial();
        transaccionMaterial.transaccion = nuevaTransaccion;
        transaccionMaterial.material = materialEntity;
        transaccionMaterial.cantidad = cantidadMaterial;
  
        // Guardar el registro en la base de datos
        await this.transaccionMaterialRepository.save(transaccionMaterial);
  
        // Verificar si la transacción es entre gestor_realiza y transformador
        if (gestorRealiza && transformadorObj) {
          // Verificar si la cantidad de material en material_gestor es suficiente
          const materialGestorRealiza = await this.materialGestorRepository.findOne({
            where: { material: materialEntity, gestor: gestorRealiza },
          });
        
          if (!materialGestorRealiza || materialGestorRealiza.cantidad < cantidadMaterial) {
            // Si no hay suficiente stock en gestor_realiza, lanzar una excepción
            throw new BadRequestException(`Stock insuficiente en gestor_realiza para el material: ${materialNombre}`);
          }
        
          // Realizar la resta de la cantidad de material de gestor_realiza
          materialGestorRealiza.cantidad -= cantidadMaterial;
        
          // Guardar la actualización de la cantidad en material_gestor
          await this.materialGestorRepository.save(materialGestorRealiza);
        
          // Verificar si el transformador tiene registros en material_transformador
          const materialTransformador = await this.materialTransformadorRepository.findOne({
            where: { material: materialEntity, transformador: transformadorObj },
          });
        
          if (materialTransformador) {
            // Si transformador tiene registros en material_transformador, sumar la cantidad
            materialTransformador.cantidad += cantidadMaterial;
            await this.materialTransformadorRepository.save(materialTransformador);
          } else {
            // Si transformador no tiene registros en material_transformador, crear uno nuevo
            const materialTransformadorNuevo = new MaterialTransformador();
            materialTransformadorNuevo.material = materialGestorRealiza.material;
            materialTransformadorNuevo.cantidad = cantidadMaterial;
            materialTransformadorNuevo.descripcion = ''; // Ajustar según tus necesidades
            materialTransformadorNuevo.transformador = transformadorObj;
        
            await this.materialTransformadorRepository.save(materialTransformadorNuevo);
          }
        }
        
        // Verificar si la transacción es entre gestor_realiza y gestor_recibe
        if (gestorRealiza && gestorRecibe) {
          // Verificar si gestor_realiza tiene suficiente stock
          const materialGestorRealiza = await this.materialGestorRepository.findOne({
            where: { material: materialEntity, gestor: gestorRealiza },
          });
    
          if (!materialGestorRealiza || materialGestorRealiza.cantidad < cantidadMaterial) {
            // Si no hay suficiente stock en gestor_realiza, lanzar una excepción
            throw new BadRequestException(`Stock insuficiente en gestor_realiza para el material: ${materialNombre}`);
          }
    
          // Descontar la cantidad de material de gestor_realiza
          materialGestorRealiza.cantidad -= cantidadMaterial;
          await this.materialGestorRepository.save(materialGestorRealiza);
    
          // Verificar si gestor_recibe tiene registros en material_gestor
          const materialGestorRecibe = await this.materialGestorRepository.findOne({
            where: { material: materialEntity, gestor: gestorRecibe },
          });
    
          if (materialGestorRecibe) {
            // Si gestor_recibe tiene registros en material_gestor, sumar la cantidad
            materialGestorRecibe.cantidad += cantidadMaterial;
            await this.materialGestorRepository.save(materialGestorRecibe);
          } else {
            // Si gestor_recibe no tiene registros en material_gestor, crear uno nuevo
            const materialGestorNuevo = new MaterialGestor();
            materialGestorNuevo.material = materialEntity;
            materialGestorNuevo.gestor = gestorRecibe;
            materialGestorNuevo.cantidad = cantidadMaterial;
            materialGestorNuevo.descripcion = ''; // Puedes ajustar esto según tus necesidades
    
            await this.materialGestorRepository.save(materialGestorNuevo);
          }
        } else {
          // La transacción no es entre gestor_realiza y gestor_recibe
          
              // Verificar si la transacción es entre gestor_recibe y entidad_externa
          if (gestorRecibe && entidad_externa) {
            // Sumar la cantidad en la tabla materiales
            materialEntity.cantidad_total += cantidadMaterial;
            await this.materialRepository.save(materialEntity);
          }
          // Verificar si existe un registro en MaterialGestor con el mismo material_id y gestor_id
          const materialGestorExistente = await this.materialGestorRepository.findOne({
            where: { material: materialEntity, gestor: gestorRecibe },
          });
  
          if (materialGestorExistente) {
            // Si existe, sumar la cantidad
            materialGestorExistente.cantidad += cantidadMaterial;
            await this.materialGestorRepository.save(materialGestorExistente);
          } else {
            // Si no existe, crear un nuevo registro en la tabla MaterialGestor
            const materialGestorNuevo = new MaterialGestor();
            materialGestorNuevo.material = materialEntity;
            materialGestorNuevo.gestor = gestorRecibe;
            materialGestorNuevo.cantidad = cantidadMaterial;
            materialGestorNuevo.descripcion = ''; // Puedes ajustar esto según tus necesidades
  
            await this.materialGestorRepository.save(materialGestorNuevo);
          }
        }
      }
  
      return nuevaTransaccion;
    } catch (error) {
      throw new BadRequestException('No se pudo crear la transacción.');
    }
  }
  
  
  async obtenerTodasLasTransacciones(): Promise<Transaccion[]> {
    return this.transaccionRepository.find();
  }
  async obtenerTransaccionesGestorRecibeEntidadExterna(): Promise<Transaccion[]> {
    return this.transaccionRepository.find({
      where: { gestor_recibe: Not(IsNull()), entidad_externa: Not(IsNull()) },
    });
  }

  async obtenerTransaccionesGestorRecibeGestorRealiza(): Promise<Transaccion[]> {
    return this.transaccionRepository.find({
      where: { gestor_recibe: Not(IsNull()), gestor_realiza: Not(IsNull()) },
    });
  }

  async obtenerTransaccionesGestorRealizaTransformador(): Promise<Transaccion[]> {
    return this.transaccionRepository.find({
      where: { gestor_realiza: Not(IsNull()), transformador: Not(IsNull()) },
    });
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
