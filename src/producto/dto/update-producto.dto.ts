import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Schema } from "mongoose";
import { CreateProductoDto } from './create-producto.dto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
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
    categoria: Schema.Types.ObjectId;

}
