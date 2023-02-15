import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import apiResponse from 'src/api.response';
import { Request } from 'express';
import { ParsedQs } from 'qs';

interface Pagination {
  total: number;
  per_page: number;
  page: number;
  current_page: number;
  total_pages: number;
}

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

  async findAll(request: ParsedQs) {

    const pagination = await this.paginationData(request);

    const data = await this.productRepository.createQueryBuilder().orderBy('id', 'DESC').offset(pagination.page).limit(pagination.per_page).getMany();

    return { data, pagination };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (product == null) {
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

  async paginationData(request: ParsedQs): Promise<Pagination> {
    let page: number = 0;
    let per_page: number = 15;

    if (request.per_page !== undefined && !isNaN(Number(request.per_page))) {
      per_page = Number(request.per_page) == 0 ? per_page : Number(request.per_page);
    }

    if (request.page !== undefined && !isNaN(Number(request.page)) && Number(request.page) > 0 ) {
      page = (Number(request.page) - 1) * per_page;
    }

    const total = await this.productRepository.count();
    const total_pages = total / per_page;

    return {
      total: total,
      per_page: per_page,
      page,
      current_page: page == 0 ? 1 : page,
      total_pages: Math.ceil(total_pages)
    };
  }
}
