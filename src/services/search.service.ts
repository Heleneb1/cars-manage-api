import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/brands/brands.schema';


@Injectable()
export class SearchService {
    constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) { }

    async searchByKeyword(keyword: string): Promise<Brand[]> {
        return this.brandModel.find({
            name: { $regex: keyword, $options: 'i' },
        }).exec();
    }

}
