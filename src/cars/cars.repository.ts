import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car, CarDocument } from "./cars.schema";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CarRepository {
    constructor(
        @InjectModel(Car.name) private carModel: Model<CarDocument>,
    ) { }
    async create(data: any): Promise<Car> {
        const createdCar = await this.carModel.create({
            _id: uuidv4(),
            ...data
        });
        return createdCar.save()

    }
    async findAll(skip: number = 1, limit: number = 10): Promise<any> {


        const [data, total] = await Promise.all([
            this.carModel.find().skip(skip).limit(limit).exec(),
            this.carModel.countDocuments().exec(),
        ]);
        return {
            data,
            total,

        };
    }
    async findById(id: string): Promise<Car | null> {
        return this.carModel.findById(id).exec();
    }
    async update(id: string, data: any) {

        return this.carModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
    }
    async delete(id: string) {
        return this.carModel.deleteOne({ _id: id }).exec();
    }


}