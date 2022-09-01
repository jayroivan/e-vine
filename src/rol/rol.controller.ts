import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { ApiTags, ApiBearerAuth, ApiBody} from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@ApiBearerAuth('JWT-auth')
@ApiTags('Roles')
@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateRolDto})
  @Post('/create')
  async createRl(@Body() createRolDto:CreateRolDto): Promise<Rol> {
    return await this.rolService.createRol(createRolDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/todos')
  findAll() {
    return this.rolService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/buscaruno')
  async getRol(@Body('rol') rol: string): Promise<Rol> {
    return await this.rolService.getRol(rol);
  }
}
