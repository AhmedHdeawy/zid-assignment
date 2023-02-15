import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductsCategories } from './entities/product.entity';
import { UniqueNameValidator } from './dto/unique_name.validator';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductsCategories])],
  controllers: [ProductsController],
  providers: [ProductsService, UniqueNameValidator]
})
export class ProductsModule {}
