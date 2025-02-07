import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { UpdateCarDto } from "./dto/update-car.dto";

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {

        return this.carsService.findAll(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.carsService.findOne(id);
    }

    @Post()
    async create(@Body() body) {
        return this.carsService.create(body);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto,) {
        updateCarDto.id = id;
        return this.carsService.update(updateCarDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.carsService.delete(id);
    }
}