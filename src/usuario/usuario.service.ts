import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserDocument, Usuario } from './entities/usuario.entity';


@Injectable()
export class UsuarioService {

  constructor(@InjectModel('usuario') private readonly userModel: Model<UserDocument>) { }


  async createUser(usuario: string, email:string, clave: string, telefono: number, rol:ObjectId): Promise<Usuario> {
      return this.userModel.create({
          usuario,
          email,
          clave,
          telefono,
          rol
      });
  }
  async getUser( usuario ): Promise<Usuario> {
    
      return await this.userModel.findOne({usuario:usuario});
  }
  
}
