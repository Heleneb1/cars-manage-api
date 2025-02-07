import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './brands.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BrandRepository {
    constructor(
        @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    ) { }

    async create(data: any): Promise<Brand> {
        const createdBrand = new this.brandModel({
            _id: uuidv4(),
            ...data,
        });
        return createdBrand.save();
    }

    async findAll(skip: number, limit: number): Promise<{ data: Brand[], total: number }> {
        const [data, total] = await Promise.all([
            this.brandModel.find().skip(skip).limit(limit).exec(),
            this.brandModel.countDocuments().exec(),
        ]);
        return { data, total };
    }

    async findById(id: string): Promise<Brand | null> {
        return this.brandModel.findById(id).exec();
    }

    async update(id: string, data: any): Promise<Brand | null> {
        return this.brandModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<any> {
        return this.brandModel.deleteOne({ _id: id }).exec();
    }
}
