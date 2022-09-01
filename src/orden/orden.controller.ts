import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Orden } from './entities/orden.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Ordenes')
@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateOrdenDto})
  @Post('/crear')
  async create(@Body() createOrdenDto: CreateOrdenDto): Promise<Orden> {
    let detalle = createOrdenDto.detalle;
    let total: number = 0;

    detalle.forEach(item => {
      total += item.subtotal;
    });

    createOrdenDto.total= total;
    return this.ordenService.create(createOrdenDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/todos')
  findAll() {
    return this.ordenService.findAll();
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
  async update(@Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    let detalle = updateOrdenDto.detalle;
    let total: number = 0;

    detalle.forEach(item => {
      total += item.subtotal;
    });

    updateOrdenDto.total = total;

    return this.ordenService.update(id, updateOrdenDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateOrdenDto})
  @Delete('/eliminar/:id')
  async remove(@Param('id') id: string): Promise<Orden> {
    return this.ordenService.remove(id);
  }
}
