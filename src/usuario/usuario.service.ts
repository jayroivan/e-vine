import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, Usuario } from './entities/usuario.entity';


@Injectable()
export class UsuarioService {

  constructor(@InjectModel('usuario') private readonly userModel: Model<UserDocument>) { }


  async createUser(usuario: string, clave: string): Promise<Usuario> {
      return this.userModel.create({
          usuario,
          clave,
      });
  }
  async getUser( usuario ): Promise<Usuario> {
    
      return await this.userModel.findOne({usuario:usuario});
  }
  
}
