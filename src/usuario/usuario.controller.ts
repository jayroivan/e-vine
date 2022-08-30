import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('/crear') //se envia un json { "usuario":"Administrador",  "clave":"123456" }
    async createUser(@Body() datos:CreateUsuarioDto): Promise<Usuario> {
        const saltOrRounds = 10;
        const claveEncriptada = await bcrypt.hash(datos.clave, saltOrRounds); // acá se encripta
        const result = await this.usuarioService.createUser(datos.usuario,claveEncriptada);
        return result;
    }



    @UseGuards(JwtAuthGuard) //necesita un token para consultar este recurso
    @Get('/buscarUno') //se envia un json { "usuario":"Administrador",  "clave":"123456" }
    async getUser( @Body('usuario') usuario: string): Promise<Usuario> {
      const resultado=await this.usuarioService.getUser(usuario)
      return resultado;
    }
}
