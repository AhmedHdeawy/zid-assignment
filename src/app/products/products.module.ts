import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductsCategories } from './entities/product.entity';
import { UniqueNameValidator } from './dto/unique_name.validator';
import { Category } from '../categories/entities/category.entity';
import { RedisCacheModule } from 'src/cache/redis-cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductsCategories]),
    CacheModule.register(),
    RedisCacheModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UniqueNameValidator]
})
export class ProductsModule {}
