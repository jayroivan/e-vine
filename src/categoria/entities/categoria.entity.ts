import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';

export type CategoriaDocument = Categoria & Document;

@Schema()
export class Categoria {
    _id: mongoose.Types.ObjectId;

    @Prop()
    nombre: string;

    @Prop()
    descripcion: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
