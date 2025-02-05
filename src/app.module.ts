import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BrandsModule } from './brands/brands.module';
import { AppController } from './app.controller';
import { CarsModule } from './cars/cars.module';


@Module({
  imports: [DatabaseModule, BrandsModule, CarsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
