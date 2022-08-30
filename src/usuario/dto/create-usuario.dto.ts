import { Schema } from "mongoose";

export class CreateUsuarioDto {
    usuario: string;

    email: string;

    clave: string;

    telefono: number;

    rol: Schema.Types.ObjectId
}
