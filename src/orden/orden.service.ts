import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Orden, OrdenDocument } from './entities/orden.entity';

@Injectable()
export class OrdenService {

  constructor(@InjectModel('orden') private readonly ordenModel: Model<OrdenDocument>) { }

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    return await this.ordenModel.create(createOrdenDto);
  }

  async findAll(): Promise<Orden[]> {
    return await this.ordenModel.find().exec();
  }

  async findOne(id: string): Promise<Orden> {
    return await this.ordenModel.findById(id);
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
