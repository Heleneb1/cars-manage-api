import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Put,
    UseGuards

} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';

import { UpdateUserDto } from './dto/update-users.dto';
import { Role } from './role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorater';

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
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
        updateUserDto._id = id;
        return this.usersService.update(updateUserDto)
    }
    //TODO revoir
    @Patch(':id/role')
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    async assignRole(@Param('id') id: string, @Body('role') role: Role): Promise<User | null> {

        return this.usersService.updateRole(id, role)
    }
}
