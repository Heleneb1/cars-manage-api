import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from 'src/brands/brands.schema';

@Schema()

export class Car extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    year: number;

    @Prop({ required: true })
    price: number;

    //une voiture appartient à une marque

    @Prop({ type: Types.ObjectId, ref: 'Brand', required: true })
    brand: Brand;
}

export const CarSchema = SchemaFactory.createForClass(Car);
