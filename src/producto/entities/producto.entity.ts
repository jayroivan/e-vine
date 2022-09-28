import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from 'mongoose';

export type ProductoDocument = Producto & Document;

@Schema()
export class Producto {
    _id: mongoose.Types.ObjectId;

    @Prop()
    nombre: string;

    @Prop()
    imagen: string;

    @Prop()
    precio: number;

    @Prop()
    cosecha: number;

    @Prop()
    stock: number;

    @Prop({type: mongoose.Types.ObjectId, ref: "categoria", required: true})
    categoria: ObjectId;
    
}

export const ProductSchema = SchemaFactory.createForClass(Producto)
