import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import apiResponse from 'src/api.response';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.save(createCategoryDto);
    } catch (error) {
      console.log("Error Happened while creating a new category");
      console.error(error.message);
      throw new HttpException(apiResponse(HttpStatus.BAD_REQUEST, error.message), HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (category == null)
    {
      throw new HttpException(apiResponse(HttpStatus.NOT_FOUND, "Category Not Found"), HttpStatus.NOT_FOUND);
    }
    return category;
  }
  
  async getCategoryByName(name: string) {
    return await this.categoryRepository.findOneBy({ name })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoryRepository.update(id, updateCategoryDto);
    } catch (error) {
      console.log("Error Happened while updating the category");
      console.error(error.message);
      throw new HttpException(apiResponse(HttpStatus.BAD_REQUEST, error.message), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    await this.categoryRepository.delete(id);
  }
}
