import { BrandsService } from './brands.service';
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateCarDto } from 'src/cars/dto/create-car.dto';

@Controller('brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) { }

    @Get()
    async findAll() {
        return this.brandsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.brandsService.findOne(id);
    }

    @Post()
    async create(@Body() body) {
        return this.brandsService.create(body);
    }
    @Post(':brandId/car')
    async addCarToBrand(
        @Param('brandId') brandId: string,
        @Body() createCarDto: CreateCarDto,
    ) {
        return this.brandsService.addCarToBrand(brandId, createCarDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto,) {
        updateBrandDto.id = id;
        return this.brandsService.update(updateBrandDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.brandsService.delete(id);
    }
}