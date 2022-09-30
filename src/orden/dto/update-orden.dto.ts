import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { detalle } from '../entities/detalle.entity';
import { CreateOrdenDto } from './create-orden.dto';

export class UpdateOrdenDto extends PartialType(CreateOrdenDto) {
    @ApiProperty()
    numero: number;

    @ApiProperty()
    total: number;

    @ApiProperty()
    usuario: Types.ObjectId;

    @ApiProperty({type: Array})
    detalle: detalle[];
}
