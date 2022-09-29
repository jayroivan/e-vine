import { Controller, Get, Post, Body, Res, Param, Delete, UseGuards, Put, HttpStatus } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@ApiTags('Productos')
@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateProductoDto})
  @Post('/crear')
  async create(@Res() res,@Body() createProductoDto: CreateProductoDto): Promise<Producto> {
    try {
      await this.productoService.create(createProductoDto);
      return res.status(HttpStatus.OK).json({message: 'Producto creado con exito!'})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Ocurrio un error al crear el producto'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/todos')
  findAll() {
    return this.productoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/obtenerUno/:id')
  async findOne(@Param('id') id: string): Promise<Producto>  {
    return this.productoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:UpdateProductoDto})
  @Put('/actualizar/:id')
  async update(@Res() res, @Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto): Promise<Producto>  {
    try {
      await this.productoService.update(id, updateProductoDto);
      return res.status(HttpStatus.OK).json({message: 'Producto actualizado con exito!'})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Ocurrio un error al actualizar el producto'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateProductoDto})
  @Delete('/eliminar/:id')
  async remove(@Param('id') id: string): Promise<Producto>  {
    return this.productoService.remove(id);
  }
}
