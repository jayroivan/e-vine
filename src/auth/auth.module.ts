import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { LocalStrategy } from "./strategies/local.strategy";
import { UsuarioSchema } from "../usuario/entities/usuario.entity";
import { UsuarioModule } from "../usuario/usuario.module";
import { UsuarioService } from "../usuario/usuario.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
 
 
 
@Module({
  imports: [UsuarioModule, PassportModule, JwtModule.register({
    secret: 'secretKey',
    signOptions: { expiresIn: '2h' },
  }), MongooseModule.forFeature([{ name: "usuario", schema: UsuarioSchema }])],
  providers: [AuthService, UsuarioService, LocalStrategy,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }