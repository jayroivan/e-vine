import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import {ApiTags} from '@nestjs/swagger'

@ApiTags('Roles')
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post('/create')
  async createRl(@Body() createRolDto:CreateRolDto): Promise<Rol> {
    return await this.rolService.createRol(createRolDto);
  }

  @Get('/todos')
  findAll() {
    return this.rolService.findAll();
  }

  @Get('/buscaruno')
  async getRol(@Body('rol') rol: string): Promise<Rol> {
    return await this.rolService.getRol(rol);
  }
}
