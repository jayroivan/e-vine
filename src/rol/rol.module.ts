import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolSchema } from './entities/rol.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: "rol", schema:RolSchema}])],
  controllers: [RolController],
  providers: [RolService]
})
export class RolModule {}
