import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import {RolDocument, Rol} from './entities/rol.entity'

@Injectable()
export class RolService {

  constructor(@InjectModel('rol') private readonly rolModel: Model<RolDocument>){}

  async createRol(nombre: string): Promise<Rol> {
    return this.rolModel.create({
      nombre
    });
  }

  async getRol(rol): Promise<Rol> {
    return await this.rolModel.findOne({rol:rol})
  }

  findAll() {
    return `This action returns all rol`;
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
