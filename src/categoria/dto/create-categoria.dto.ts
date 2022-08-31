import { ApiProperty } from '@nestjs/swagger'

export class CreateCategoriaDto {
    @ApiProperty()
    nombre: string;
    descripcion: string;
}
