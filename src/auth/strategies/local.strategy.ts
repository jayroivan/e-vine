import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
 
 
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      
      usernameField: 'email', //necesitamos que sepa como se llaman las llaven de nuestro json
      passwordField: 'clave', //si usa password y username no debe de establecer estas opciones
 
      // asi lo enviamos { "usuario":"Administrador",  "clave":"123456" }
      // si fuera de esta forma no se requiere { "username":"Administrador",  "password":"123456" }
    });
  }
 
  async validate(usuario): Promise<any> {
    const user = await this.authService.login(usuario);
    if (!user) {
      throw new UnauthorizedException(); // si el token es inválido
    }
    return user;
  }
}
