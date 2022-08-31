import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/producto.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name:'producto', schema: ProductSchema}])],
  controllers: [ProductoController],
  providers: [ProductoService]
})
export class ProductoModule {}
