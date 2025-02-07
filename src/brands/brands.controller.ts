import { BrandsService } from './brands.service';
import { Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateCarDto } from 'src/cars/dto/create-car.dto';
import { SearchService } from 'src/services/search.service';

@Controller('brands')
export class BrandsController {
    constructor(
        private readonly brandsService: BrandsService,
        private readonly searchService: SearchService
        ,) { }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.brandsService.findAll(page, limit);
    }
    @Get("search")
    async search(
        @Query('keyword') keyword: string,

    ) {
        return this.searchService.searchByKeyword(keyword);
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
        console.log('brandId', brandId);
        console.log(typeof brandId);
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