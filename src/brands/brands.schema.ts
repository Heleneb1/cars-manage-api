import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, model, Types } from 'mongoose';
import { Car, CarSchema } from 'src/cars/cars.schema';
import { v4 as uuidv4 } from 'uuid';

export type BrandDocument = Brand & Document;
@Schema({ timestamps: true })
export class Brand extends Document {
    @Prop({ type: String, default: () => uuidv4() })
    _id: string;
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    country: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Car' }] })
    cars: Types.ObjectId[];
}

export const BrandSchema = SchemaFactory.createForClass(Brand);


const carModel = model('Car', CarSchema)

BrandSchema.pre('findOneAndDelete', async function (next) {
    try {
        const brandId = this.getQuery()._id;
        await carModel.deleteMany({ brand: brandId })
        next()
    } catch (error) {
        next(error)
    }

});
