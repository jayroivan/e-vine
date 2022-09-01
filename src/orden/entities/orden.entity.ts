import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
import { detalle } from "./detalle.entity";

export type OrdenDocument = Orden & Document;

@Schema()
export class Orden {
    _id: mongoose.Types.ObjectId;

    @Prop()
    numero: number;

    @Prop({default: Date.now})
    fecha: Date;

    @Prop()
    total: number;

    @Prop({type: Array})
    detalle: detalle[]
}

export const OrdenSchema = SchemaFactory.createForClass(Orden);