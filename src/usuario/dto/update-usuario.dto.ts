import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty()
    usuario: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    clave: string;

    @ApiProperty()
    telefono: number;
}
