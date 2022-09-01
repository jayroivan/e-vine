import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdenSchema } from './entities/orden.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'orden', schema: OrdenSchema}])],
  controllers: [OrdenController],
  providers: [OrdenService]
})
export class OrdenModule {}
