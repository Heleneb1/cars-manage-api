import {
    BadRequestException,

    Controller,
    Delete,
    Get,
    Param,

} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Get()
    async findAll(): Promise<User[]> {
        try {
            return this.usersService.findAll();
        } catch (error) {
            throw new BadRequestException('Failed to fetch users', error.message);
        }
    }
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne(id);
    }
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User | null> {
        return this.usersService.delete(id);
    }
}
