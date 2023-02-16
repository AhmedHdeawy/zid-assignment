import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import apiResponse from 'src/api.response';
import { Response } from 'express';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoriesService.create(createCategoryDto);

    return apiResponse(200, "Category Created Successfully", data);
  }

  @Get()
  async findAll() {
    const data = await this.categoriesService.findAll();
    return apiResponse(200, "Categories Retrieved Successfully", data, null);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.categoriesService.findOne(+id);
    return apiResponse(200, "Category Retrieved Successfully", data, null);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesService.update(+id, updateCategoryDto);
    
    const data = await this.categoriesService.findOne(+id);

    return apiResponse(200, "Category Updated Successfully", data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.categoriesService.remove(+id);

    return apiResponse(200, "Category Deleted Successfully");
  }
}
