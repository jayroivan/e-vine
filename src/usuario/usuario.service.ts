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
  
  async findAll(): Promise<Usuario[]> {

     return this.userModel.find({},{usuario:1, email:1, telefono:1}).exec();
  }
  
  async updateUser(id: string, usuario: string, email:string, clave: string, telefono: number): Promise<Usuario>{
    let user = await this.userModel.findById(id);
    if(user != null){
        user.usuario = usuario
        user.email = email
        user.clave = clave
        user.telefono = telefono

        return this.userModel.findByIdAndUpdate({_id: id}, user, {new: true}).exec();
    }
  
}
