import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
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
  async create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(createCategoriaDto);
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
  async update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria>  {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/eliminar/:id')
  async remove(@Param('id') id: string): Promise<Categoria>  {
    return this.categoriaService.remove(id);
  }
}
