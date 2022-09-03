import mongoose, { Mongoose } from 'mongoose';

export class detalle{
    producto: mongoose.Types.ObjectId;
    cantidad:number;
    precio:number;
    subtotal:number;
}