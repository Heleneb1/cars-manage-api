import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateCarDto } from 'src/cars/dto/create-car.dto';

import { Brand } from './brands.schema';
import { BrandRepository } from './brands.repository';
import { CarRepository } from 'src/cars/cars.repository';

@Injectable()
export class BrandsService {
    constructor(
        private readonly brandRepository: BrandRepository,
        private readonly carRepository: CarRepository,
    ) { }

    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
        try {
            return this.brandRepository.create(createBrandDto);
        } catch (error) {
            throw new Error('Erreur lors de la création de la marque: ' + error.message);
        }
    }

    async findAll(page: number = 1, limit: number = 10): Promise<any> {
        const skip = (page - 1) * limit;
        const { data, total } = await this.brandRepository.findAll(skip, limit);
        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: string): Promise<Brand | null> {
        const brand = await this.brandRepository.findById(id);
        if (!brand) {
            throw new NotFoundException(`Brand ${id} not found`);
        }
        return brand;
    }

    async update(updateBrandDto: UpdateBrandDto): Promise<Brand | null> {
        const brand = await this.brandRepository.findById(updateBrandDto.id);
        if (!brand) {
            throw new NotFoundException(`Brand ${updateBrandDto.id} not found`);
        }
        return this.brandRepository.update(updateBrandDto.id, updateBrandDto);
    }

    async delete(id: string): Promise<any> {
        const result = await this.brandRepository.delete(id);
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Brand ${id} not found`);
        }
        return { message: `Brand ${id} deleted` };
    }

    async addCarToBrand(brandId: string, createCarDto: CreateCarDto): Promise<any> {
        const brand = await this.brandRepository.findById(brandId);
        if (!brand) {
            throw new NotFoundException(`Brand ${brandId} not found`);
        }
        const newCar = await this.carRepository.create({
            ...createCarDto,
            brandId: brand._id,
        });
        return { message: 'Voiture ajoutée à la marque', car: newCar };
    }
}
