import { Controller, Get, Post, Body, Res, Param, Delete, UseGuards, Put, HttpStatus } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto'
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {ApiTags, ApiBody, ApiBearerAuth} from '@nestjs/swagger'

@ApiBearerAuth('JWT-auth')
@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}
  @ApiBody({type:CreateUsuarioDto})
  @Post('/crear')
    async createUser(@Res() res, @Body() datos:CreateUsuarioDto): Promise<Usuario> {
        try {
          const saltOrRounds = 10;
          const claveEncriptada = await bcrypt.hash(datos.clave, saltOrRounds);
          await this.usuarioService.createUser(datos.usuario,datos.email,claveEncriptada,datos.telefono,datos.rol);
          return res.status(HttpStatus.OK).json({message: 'Usuario creado con exito!'})
        } catch (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Ocurrio un error al crear el usuario'})
        }
    }

  @UseGuards(JwtAuthGuard)
  @Get('/buscarUno:id')
    async getUser( @Param('id') id: string): Promise<Usuario> {
      const resultado = await this.usuarioService.getUser(id)
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
    async updateUser(@Res() res, @Body() datos: UpdateUsuarioDto, @Param("id") id: string ): Promise<Usuario> {
      try {
        const saltOrRounds = 10;
        const claveEncriptada = await bcrypt.hash(datos.clave, saltOrRounds);
        await this.usuarioService.updateUser(id, datos.usuario, datos.email, claveEncriptada, datos.telefono);
        return res.status(HttpStatus.OK).json({message:'Usuario actualizado con exito!'})
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error al actualizar usuario'})
      }

    }
}
