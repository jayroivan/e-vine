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

    @ApiProperty({default: "630e4904c649bf6ec9ce0c35"})
    rol: Schema.Types.ObjectId
}
