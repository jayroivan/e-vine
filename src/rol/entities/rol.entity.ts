import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type RolDocument = Rol & Document;

@Schema()
export class Rol {
    _id: mongoose.Types.ObjectId;

    @Prop()
    nombre: string;
    
}

export const RolSchema = SchemaFactory.createForClass(Rol);
