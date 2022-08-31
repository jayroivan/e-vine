import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './entities/categoria.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"categoria", schema:CategoriaSchema}])],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
