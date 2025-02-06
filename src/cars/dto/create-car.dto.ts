import { Transform } from 'class-transformer';
import { IsString, IsInt, IsNotEmpty, Min, IsNumber } from 'class-validator';

export class CreateCarDto {

    brandId: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1886)
    year: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Min(1500)
    price: number;
}