import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = Usuario & Document;

@Schema()
export class Usuario {
  
  _id: mongoose.Types.ObjectId;
  @Prop()
  usuario: string;

  @Prop()
  email: string;

  @Prop()
  clave: string;

  @Prop()
  telefono: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Rol', required: true})
  rol: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
