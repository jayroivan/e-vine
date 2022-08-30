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

<<<<<<< HEAD
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Rol', required: true })
  rol: string
=======
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Rol', required: true})
  rol: string;
>>>>>>> c5826111346ec11b85c56f6406d417992d9f8cfd
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
