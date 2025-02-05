import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './brands.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateCarDto } from 'src/cars/dto/create-car.dto';
import { Car, CarDocument } from 'src/cars/cars.schema';


@Injectable()
export class BrandsService {
    constructor(

        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
        @InjectModel(Car.name) private carModel: Model<CarDocument>,

    ) { }

    async create(createBrandDto: CreateBrandDto): Promise<Brand> {
        try {
            const createdBrand = await this.brandModel.create({
                _id: uuidv4(),
                name: createBrandDto.name,
                country: createBrandDto.country,
            });
            return await createdBrand.save()
        } catch (error) {
            {
                throw new Error('Erreur lors de la création de la marque: ' + error.message);
            };
        }
    }

    async findAll(): Promise<Brand[]> {
        try {
            return this.brandModel.find()
                .populate({
                    path: 'cars',
                    select: 'model'

                })
                .exec();
        } catch (error) {
            {
                throw new Error('Erreur lors de la récipération des marques: ' + error.message);
            };
        }
    }
    async findOne(id: string): Promise<Brand | null> {
        return this.brandModel.findById(id).exec();
    }
    async update(updateBrandDto: UpdateBrandDto) {
        const brand = await this.brandModel.findById(updateBrandDto.id).exec();
        if (!brand) {
            throw new NotFoundException(`Brand ${updateBrandDto.id} not found`);
        }
        return this.brandModel
            .findByIdAndUpdate(updateBrandDto.id, updateBrandDto, { new: true })
            .exec();
    }
    async delete(id: string) {
        const brandToDelete = this.brandModel.deleteOne({ _id: id }).exec();
        if ((await brandToDelete).deletedCount === 0) {
            throw new NotFoundException(`Brand ${id} not found`);
        }
        return { message: ` Brand ${id} deleted ` };
    }

    async addCarToBrand(brandId: string, createCarDto: CreateCarDto) {
        const brand = await this.brandModel.findById(brandId).exec();
        if (!brand) {
            throw new NotFoundException(`Brand ${brandId} not found`);
        }
        const newCar = {
            ...createCarDto,
            _id: uuidv4(),
            brandId: brand._id,
        };
        brand.cars.push(newCar as any);
        await brand.save();
        return { message: 'voiture ajoutée à la marque', car: newCar };
    }



}
