import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdenSchema } from './entities/orden.entity';
import { ProductSchema } from '../producto/entities/producto.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'orden', schema: OrdenSchema}]), MongooseModule.forFeature([{name: 'producto', schema: ProductSchema}])],
  controllers: [OrdenController],
  providers: [OrdenService]
})
export class OrdenModule {}
