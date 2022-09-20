import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/entities/usuario.entity';
 
@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsuarioService, private jwtService: JwtService) { }
    async login(user: any) {
        const usuario:Usuario = await this.usersService.getUserEmail( user.email );
        if (!usuario) return   new NotAcceptableException('No existe el usuario indicado');
        const validarPassword = await bcrypt.compare(user.clave, usuario.clave)
        if (usuario && validarPassword) {
           
            const payload = { usuario: usuario.usuario, id:usuario._id, email:usuario.email, telefono:usuario.telefono, rol:usuario.rol };
        return {
            access_token: this.jwtService.sign(payload),
        };
        }
        return 'clave incorrecta'
    }
}
