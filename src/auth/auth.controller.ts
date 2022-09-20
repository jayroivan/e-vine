import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {ApiBearerAuth, ApiBody} from '@nestjs/swagger'
 
@ApiBearerAuth('JWT-auth')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {
       
     }
 
   @UseGuards(LocalAuthGuard)
   @ApiBody({schema: {type: 'object', properties: {email: { type: 'string', example: 'example@gmail.com' }, clave: { type: 'string', example: '********'}}}})
    @Post('auth/login') 
    async login(@Request() req) {
        return this.authService.login(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('secreto')
    secreto(@Request() req) {
        return { mensaje:"Usuario autenticado" };
    }
}
