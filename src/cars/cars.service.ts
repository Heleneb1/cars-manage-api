import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car, CarDocument } from "./cars.schema";
import { CreateCarDto } from "./dto/create-car.dto";
import { v4 as uuidv4 } from 'uuid';
import { UpdateCarDto } from "./dto/update-car.dto";
import { CarRepository } from "./cars.repository";

@Injectable()
export class CarsService {
    constructor(
        private readonly carRepository: CarRepository
    ) { }
    async create(createCarDto: CreateCarDto): Promise<Car> {
        try { return this.carRepository.create(createCarDto) }

        catch (error) {
            throw new Error(error);
        };
    }
    async findAll(page: number = 1, limit: number = 10): Promise<any> {
        const skip = (page - 1) * limit;

        const { data, total } = await this.carRepository.findAll(skip, limit);
        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id: string): Promise<Car | null> {
        const car = this.carRepository.findById(id)
        if (!car) {
            throw new NotFoundException(`Car ${id} not found`)
        }
        return car
    }
    async update(updateCarDto: UpdateCarDto) {
        const car = await this.carRepository.findById(updateCarDto.id);
        if (!car) {
            throw new NotFoundException(`Car #${updateCarDto.id} not found`);
        }
        return this.carRepository
            .update(updateCarDto.id, updateCarDto)

    }
    async delete(id: string) {
        return this.carRepository.delete(id);
    }

}