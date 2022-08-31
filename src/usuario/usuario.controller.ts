import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {ApiTags, ApiBody} from '@nestjs/swagger'


@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}
  @ApiBody({type:CreateUsuarioDto})
  @Post('/crear') //se envia un json { "usuario":"Administrador",  "clave":"123456" }
    async createUser(@Body() datos:CreateUsuarioDto): Promise<Usuario> {
        const saltOrRounds = 10;
        const claveEncriptada = await bcrypt.hash(datos.clave, saltOrRounds); // acá se encripta
        const result = await this.usuarioService.createUser(datos.usuario,datos.email,claveEncriptada,datos.telefono,datos.rol);
        return result;
    }

  @UseGuards(JwtAuthGuard) //necesita un token para consultar este recurso
  @ApiBody({type:CreateUsuarioDto})
  @Get('/buscarUno') //se envia un json { "usuario":"Administrador",  "clave":"123456" }
    async getUser( @Body('usuario') usuario: string): Promise<Usuario> {
      const resultado = await this.usuarioService.getUser(usuario)
      return resultado;
    }
    
  @UseGuards(JwtAuthGuard)
  @Get('/lista')
    findAll() {
      return this.usuarioService.findAll()
    }
  
  @UseGuards(JwtAuthGuard)
  @ApiBody({type:UpdateUsuarioDto})
  @Put('/actualizar/:id')
    async updateUser(@Body() datos: UpdateUsuarioDto, @Param("id") id: string ): Promise<Usuario> {
      const saltOrRounds = 10;
      const claveEncriptada = await bcrypt.hash(datos.clave, saltOrRounds); // acá se encripta
      const resultado = this.usuarioService.updateUser(id, datos.usuario, datos.email, claveEncriptada, datos.telefono);
      return resultado;
    }
}
