import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import apiResponse from 'src/api.response';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.save(createProductDto);
    } catch (error) {
      console.log("Error Happened while creating a new product");
      console.error(error.message);
      throw new HttpException(apiResponse(HttpStatus.BAD_REQUEST, error.message), HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (product == null)
    {
      throw new HttpException(apiResponse(HttpStatus.NOT_FOUND, "Product Not Found"), HttpStatus.NOT_FOUND);
    }
    return product;
  }
  
  async getProductByName(name: string) {
    return await this.productRepository.findOneBy({ name })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      console.log("Error Happened while updating the product");
      console.error(error.message);
      throw new HttpException(apiResponse(HttpStatus.BAD_REQUEST, error.message), HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    await this.productRepository.delete(id);
  }
}
