import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { detalle } from '../entities/detalle.entity';
import { CreateOrdenDto } from './create-orden.dto';

export class UpdateOrdenDto extends PartialType(CreateOrdenDto) {
    @ApiProperty()
    numero: number;

    @ApiProperty()
    total: number;

    @ApiProperty({type: Array})
    detalle: detalle[];
}
