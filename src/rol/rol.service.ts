import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import {RolDocument, Rol} from './entities/rol.entity'

@Injectable()
export class RolService {

  constructor(@InjectModel('rol') private readonly rolModel: Model<RolDocument>){}

  async createRol(createRolDto:CreateRolDto): Promise<Rol> {
    return this.rolModel.create(createRolDto);
  }

  async getRol(id: string): Promise<Rol> {
    return await this.rolModel.findById(id);
  }

  async findAll(): Promise<Rol[]> {
    return this.rolModel.find().exec();
  }

}
