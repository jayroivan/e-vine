import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria, CategoriaDocument } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {

  constructor(@InjectModel('categoria') private readonly categoriaModel: Model<CategoriaDocument>) { }

  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return await this.categoriaModel.create(createCategoriaDto);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaModel.find().exec();
  }

  async findOne(id: string): Promise<Categoria> {
    return await this.categoriaModel.findById(id);
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    let categoria = await this.categoriaModel.findById(id);
    if(categoria != null){
      return this.categoriaModel.findByIdAndUpdate({_id:id}, updateCategoriaDto, {new: true});
    }
  }

  async remove(id: string) {
    let categoria = await this.categoriaModel.findById(id);
    if(categoria != null){
      return this.categoriaModel.findByIdAndRemove({id});
    }    
  }
}
