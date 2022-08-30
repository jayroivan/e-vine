import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [UsuarioModule,AuthModule,MongooseModule.forRoot('mongodb+srv://admin:xG9mvZrLzoi0tPMG@cluster0.fniwoim.mongodb.net/e-vine?retryWrites=true&w=majority'), RolModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}