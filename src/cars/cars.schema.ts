import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from 'src/brands/brands.schema';
import { v4 as uuidv4 } from 'uuid';

export type CarDocument = Car & Document;
@Schema()

export class Car {
    @Prop({ type: String, default: () => uuidv4() })
    _id: string;
    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    year: number;

    ;

    @Prop({ type: Types.Decimal128, required: true })
    price: Types.Decimal128

    //une voiture appartient à une marque

    @Prop({ type: Types.UUID, ref: 'Brand', required: true })
    brandId: Types.UUID;
}

export const CarSchema = SchemaFactory.createForClass(Car);
