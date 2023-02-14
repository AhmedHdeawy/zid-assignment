import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './app/categories/categories.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    CategoriesModule,
    ConfigModule.forRoot(),
    DatabaseModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
