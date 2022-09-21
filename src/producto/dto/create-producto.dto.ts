import { Schema } from "mongoose";
import { ApiProperty } from '@nestjs/swagger'

export class CreateProductoDto {
    @ApiProperty()
    nombre: string;

    @ApiProperty()
    imagen: string;

    @ApiProperty()
    precio: number;

    @ApiProperty()
    cosecha: number;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    categoria: Schema.Types.ObjectId
}
