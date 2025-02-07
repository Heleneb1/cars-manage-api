import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car, CarDocument } from "./cars.schema";
import { CreateCarDto } from "./dto/create-car.dto";
import { v4 as uuidv4 } from 'uuid';
import { UpdateCarDto } from "./dto/update-car.dto";

@Injectable()
export class CarsService {
    constructor(
        @InjectModel(Car.name) private carModel: Model<CarDocument>,
    ) { }
    async create(createCarDto: CreateCarDto): Promise<Car> {
        const createdCar = await this.carModel.create({
            _id: uuidv4(),
            model: createCarDto.model,
            year: createCarDto.year,
            price: createCarDto.price,
            brandId: createCarDto.brandId,
        });
        return createdCar.save()
            .then((car) => {
                return car;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }
    async findAll(page: number = 1, limit: number = 10): Promise<any> {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.carModel.find().skip(skip).limit(limit).exec(),
            this.carModel.countDocuments().exec(),
        ]);
        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id: string): Promise<Car | null> {
        return this.carModel.findById(id).exec();
    }
    async update(updateCarDto: UpdateCarDto) {
        const car = await this.carModel.findById(updateCarDto.id).exec();
        if (!car) {
            throw new NotFoundException(`Car #${updateCarDto.id} not found`);
        }
        return this.carModel
            .findByIdAndUpdate(updateCarDto.id, updateCarDto, { new: true })
            .exec();
    }
    async delete(id: string) {
        return this.carModel.deleteOne({ _id: id }).exec();
    }

}