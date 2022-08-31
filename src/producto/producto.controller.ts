import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Productos')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateProductoDto})
  @Post('/crear')
  async create(@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    return this.productoService.create(createProductoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/todos')
  findAll() {
    return this.productoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateProductoDto})
  @Get('/obtenerUno/:id')
  async findOne(@Param('id') id: string): Promise<Producto>  {
    return this.productoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:UpdateProductoDto})
  @Put('/actualizar/:id')
  async update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto): Promise<Producto>  {
    return this.productoService.update(id, updateProductoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateProductoDto})
  @Delete('/eliminar/:id')
  async remove(@Param('id') id: string): Promise<Producto>  {
    return this.productoService.remove(+id);
  }
}
