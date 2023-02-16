import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import apiResponse from 'src/api.response';
import { Request } from 'express';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productsService.create(createProductDto);

    return apiResponse(200, "Product Created Successfully", data);
  }

  @Get()
  async findAll(@Req() request: Request) {

    const data = await this.productsService.findAll(request.query);

    return apiResponse(200, "Products Retrieved Successfully", data, null);
  }

  @Get('/random')
  async getRandomProducts(@Req() request: Request) {
    const data = await this.productsService.getRandomProducts(request.query);
    return apiResponse(200, "Random Products Retrieved Successfully", data, null);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(+id);
    return apiResponse(200, "Product Retrieved Successfully", data, null);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productsService.update(+id, updateProductDto);
    
    const data = await this.productsService.findOne(+id);

    return apiResponse(200, "Product Updated Successfully", data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productsService.remove(+id);

    return apiResponse(200, "Product Deleted Successfully");
  }
}
