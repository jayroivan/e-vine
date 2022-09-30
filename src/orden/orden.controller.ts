import { Controller, Get, Post, Body, Res, Param, Delete, Put, UseGuards, HttpStatus } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Orden } from './entities/orden.entity';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@ApiTags('Ordenes')
@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateOrdenDto})
  @Post('/crear')
  async create(@Res() res, @Body() createOrdenDto: CreateOrdenDto): Promise<Orden> {
    try {
      let detalle = createOrdenDto.detalle;
      let total: number = 0;

      detalle.forEach(item => {
        total += item.subtotal;
      });

      createOrdenDto.total= total;
      await this.ordenService.create(createOrdenDto);
      return res.status(HttpStatus.OK).json({message: 'Orden creada con exito!'})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Ocurrio un error al crear la orden'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/todos')
  findAll() {
    return this.ordenService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/obtenerultimaorden')
  obtenerUltimaOrden(){
    return this.ordenService.obtenerUltimaOrden();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateOrdenDto})
  @Get('/buscarUno/:id')
  async findOne(@Param('id') id: string): Promise<Orden> {
    return this.ordenService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:UpdateOrdenDto})
  @Put('/actualizar/:id')
  async update(@Res() res, @Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    try {
      let detalle = updateOrdenDto.detalle;
      let total: number = 0;

      detalle.forEach(item => {
        total += item.subtotal;
      });

      updateOrdenDto.total = total;

      await this.ordenService.update(id, updateOrdenDto);
      return res.status(HttpStatus.OK).json({message: 'Orden actualizada con exito!'})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Ocurrio un error al actualizar la orden'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateOrdenDto})
  @Delete('/eliminar/:id')
  async remove(@Param('id') id: string): Promise<Orden> {
    return this.ordenService.remove(id);
  }
}
