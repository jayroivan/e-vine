import { Schema } from "mongoose";
import { ApiProperty } from '@nestjs/swagger'

export class CreateUsuarioDto {
    @ApiProperty()
    usuario: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    clave: string;

    @ApiProperty()
    telefono: number;

    @ApiProperty()
    rol: Schema.Types.ObjectId
}
