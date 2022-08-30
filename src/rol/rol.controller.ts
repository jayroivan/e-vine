import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post('/rol/create')
  async createRl(@Body() datos:CreateRolDto): Promise<Rol> {
    return await this.rolService.createRol(datos.nombre);
  }

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get('/rol/buscaruno')
  async getRol(@Body('rol') rol: string): Promise<Rol> {
    return await this.rolService.getRol(rol);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(+id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolService.remove(+id);
  }
}
