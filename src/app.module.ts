import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './app/categories/categories.module';
import { ProductsModule } from './app/products/products.module';
import { DataSource } from 'typeorm';
import { RedisCacheModule } from './cache/redis-cache.module';

@Module({
  imports: [
    CategoriesModule,

    ProductsModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    CacheModule.register(),
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
