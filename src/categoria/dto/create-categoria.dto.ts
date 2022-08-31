import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoriaDto {
    @ApiProperty()
    nombre: string;

    @ApiProperty()
    descripcion: string;
}
