import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { UpdateCarDto } from "./dto/update-car.dto";

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Get()
    async findAll() {
        return this.carsService.findAll();
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