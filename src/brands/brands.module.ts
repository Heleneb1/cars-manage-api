import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BrandsController } from "./brands.controller";
import { BrandSchema } from "./brands.schema";
import { BrandsService } from "./brands.service";
import { CarSchema } from "src/cars/cars.schema";
import { CarsModule } from "src/cars/cars.module";
import { SearchService } from "src/services/search.service";
import { BrandRepository } from "./brands.repository";



@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Brand',
                schema: BrandSchema
            },
            {
                name: 'Car',
                schema: CarSchema
            }
        ]),
        CarsModule

    ],
    controllers: [BrandsController],
    providers: [BrandsService, SearchService, BrandRepository],
})
export class BrandsModule { }