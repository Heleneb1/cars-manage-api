import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CarSchema } from "./cars.schema";
import { CarsService } from "./cars.service";
import { CarsController } from "./cars.controller";
import { CarRepository } from "./cars.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Car',
                schema: CarSchema
            }
        ])
    ],
    controllers: [CarsController],
    providers: [CarsService, CarRepository],
    exports: [CarRepository]
})
export class CarsModule { }