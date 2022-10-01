 import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto, ProductoDocument } from 'src/producto/entities/producto.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Orden, OrdenDocument } from './entities/orden.entity';

@Injectable()
export class OrdenService {

  constructor(@InjectModel('orden') private readonly ordenModel: Model<OrdenDocument>, @InjectModel('producto') private readonly productoModel: Model<ProductoDocument>) { }

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    let detalle = createOrdenDto.detalle;

    detalle.forEach(async item => {
      let producto = await this.productoModel.findById(item.producto);
      if(producto != null){
        var result: number = producto.stock - item.cantidad;
        producto.stock = result;
        await this.productoModel.findByIdAndUpdate({_id: producto._id}, producto, {new: true})
      }      
    });

    return await this.ordenModel.create(createOrdenDto);
  }

  async findAll(): Promise<Orden[]> {
    return await this.ordenModel.find().populate('usuario').exec();
  }

  async obtenertodas(id: string): Promise<Orden[]> {
    return await this.ordenModel.find({usuario: id}).exec();
  }

  async findOne(id: string): Promise<Orden> {
    return await this.ordenModel.findById(id);
  }

  async obtenerUltimaOrden(): Promise<Orden>{
    return await this.ordenModel.findOne().sort({_id: -1}).exec();
  }

  async update(id: string, updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    let orden = await this.ordenModel.findById(id);
    if(orden != null){
      return await this.ordenModel.findByIdAndUpdate({_id: id}, updateOrdenDto, {new: true});
    }
  }

  async remove(id: string): Promise<Orden> {
    let orden = await this.ordenModel.findById(id);
    if(orden != null){
      return await this.ordenModel.findByIdAndRemove(id);
    }
  }
}
