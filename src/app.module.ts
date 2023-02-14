import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './app/categories/categories.module';
// import dbConfiguration from './config/database.config';

@Module({
  imports: [
    CategoriesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
