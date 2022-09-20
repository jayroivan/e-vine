import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export type UserDocument = Usuario & Document;

@Schema()
export class Usuario {
  
  _id: mongoose.Types.ObjectId;
  @Prop()
  usuario: string;

  @Prop({required:true, unique:true})
  email: string;

  @Prop({required:true})
  clave: string;

  @Prop({required:true})
  telefono: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Rol', required: true, default:"630e4904c649bf6ec9ce0c35" })
  rol: ObjectId
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
