import mongoose, { Mongoose } from 'mongoose';

export class detalle{
    producto: mongoose.Types.ObjectId;
    nombre:string;
    cantidad:number;
    precio:number;
    subtotal:number;
}