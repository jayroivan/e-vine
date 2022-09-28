import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto, ProductoDocument } from './entities/producto.entity';

@Injectable()
export class ProductoService {

  constructor(@InjectModel('producto') private readonly productoModel: Model<ProductoDocument>) { }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    return await this.productoModel.create(createProductoDto);
  }

  async findAll(): Promise<Producto[]> {
    return await this.productoModel.find().populate({path:'categoria', select:'nombre'}).exec()
  }

  async findOne(id: string): Promise<Producto> {
    return await this.productoModel.findById(id);
  }

  async update(id: string, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    let producto = await this.productoModel.findById(id);
    if(producto != null){
      return await this.productoModel.findByIdAndUpdate({_id: id}, updateProductoDto, {new: true});  
    }
  }
  
  async remove(id: number): Promise<Producto> {
    let producto = await this.productoModel.findById(id);
    if(producto != null){
      return await this.productoModel.findByIdAndRemove(id);
    }
  }
}
