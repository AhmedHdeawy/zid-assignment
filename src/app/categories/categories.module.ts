import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { UniqueNameValidator } from './dto/unique_name.validator';
import { IsCategoriesExistsValidator } from '../products/dto/categories_exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, UniqueNameValidator, IsCategoriesExistsValidator]
})
export class CategoriesModule {}
