import  { Types } from "mongoose";
import { ApiProperty } from '@nestjs/swagger'
import { detalle } from "../entities/detalle.entity";

export class CreateOrdenDto {

    @ApiProperty()
    numero: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    usuario: Types.ObjectId;

    @ApiProperty({type: Array})
    detalle: detalle[];
}
