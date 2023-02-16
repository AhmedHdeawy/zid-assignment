import { Injectable, HttpException, HttpStatus, CACHE_MANAGER, Inject } from '@nestjs/common';
import {Cache} from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, In } from 'typeorm';
import { Product, ProductsCategories } from './entities/product.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import apiResponse from 'src/api.response';
import { ParsedQs } from 'qs';
import { Category } from '../categories/entities/category.entity';

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
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(ProductsCategories)
    private productCategoryRepository: Repository<ProductsCategories>,
    private dataSource: DataSource,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async create(createProductDto: CreateProductDto) {
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      const savedProduct = await this.productRepository.save(createProductDto);

      await this.saveCategoriesWithProduct(createProductDto.categories, savedProduct);

      await queryRunner.commitTransaction();

      return savedProduct;

    } catch (error) {
      console.log("Error Happened while creating a new product");
      console.error(error.message);
      await queryRunner.rollbackTransaction();
      throw new HttpException(apiResponse(HttpStatus.BAD_REQUEST, error.message), HttpStatus.BAD_REQUEST);

    } finally {
      await queryRunner.release();
    }
  }

  async findAll(request: ParsedQs) {

    const pagination = await this.paginationData(request);

    const data = await this.productRepository.createQueryBuilder().orderBy('id', 'DESC').offset(pagination.page).limit(pagination.per_page).getMany();

    return { data, pagination };
  }
  
  async getRandomProducts(request: ParsedQs) {
    return await this.getPaginatedRandomProducts(request);
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

  async saveCategoriesWithProduct(categories: Category[], savedProduct: Product): Promise<Category[]> {
    
    let dbCategories: Category[] = [];
    
    for (let index = 0; index < categories.length; index++) {
      const category = await this.categoryRepository.findOneByOrFail({ id: categories[index].id });

      dbCategories.push(category);

      const productCategory = new ProductsCategories();
      productCategory.category = category;
      productCategory.product = savedProduct;

      await this.productCategoryRepository.save(productCategory);
    }

    return dbCategories;
  }


  async getPaginatedRandomProducts(request: ParsedQs): Promise<Product[]> {

    const page: number = request.page !== undefined && !isNaN(Number(request.page)) ? Number(request.page) : 1;
    const pageSize: number = request.per_page !== undefined && !isNaN(Number(request.per_page)) ? Number(request.per_page) : 3;

    const cacheKey = 'randomProductIds';
    let productIds = await this.cacheManager.get<number[]>(cacheKey);

    if (!productIds) {
      const allProductIds = await this.productRepository
        .createQueryBuilder()
        .select('id')
        .getRawMany();

      productIds = this.shuffleArray(allProductIds.map((p) => p.id));
      await this.cacheManager.set(cacheKey, productIds, { ttl: 3600 });
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageProductIds = productIds.slice(startIndex, endIndex);
    
    const products = await this.productRepository.findBy({
      id: In(pageProductIds)
    });

    return products;
  }

  private shuffleArray(array: any[]): any[] {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }
}
