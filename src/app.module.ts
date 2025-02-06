import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { BrandsModule } from './brands/brands.module';
import { AppController } from './app.controller';
import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [DatabaseModule, BrandsModule, CarsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
