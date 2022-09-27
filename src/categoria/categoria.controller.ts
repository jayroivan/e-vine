import { Controller, Get, Post, Body, Res, Param, Delete, Put, UseGuards, HttpStatus } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Categoria } from './entities/categoria.entity';
import {ApiTags, ApiBody, ApiBearerAuth} from '@nestjs/swagger'

@ApiBearerAuth('JWT-auth')
@ApiTags('Categorias')
@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateCategoriaDto})
  @Post('/crear')
  async create(@Res() res, @Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    try {
      await this.categoriaService.create(createCategoriaDto);
      return res.status(HttpStatus.OK).json({message: 'Categoria creada con exito!'})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Ocurrio un error al crear la caegoria'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/todos')
  async findAll() {
    return this.categoriaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:CreateCategoriaDto})
  @Get('/obtenerUno/:id')
  async findOne(@Param('id') id: string): Promise<Categoria>  {
    return this.categoriaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({type:UpdateCategoriaDto})
  @Put('/actualizar/:id')
  async update(@Res() res, @Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>  {
    try {
      await this.categoriaService.update(id, updateCategoriaDto);
      return res.status(HttpStatus.OK).json({message: 'Categoria Actualizada con exito!'})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Ocurrio un error al actualizar la categoria'})
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/eliminar/:id')
  async remove(@Param('id') id: string) {
    return this.categoriaService.remove(id);
  }
}
