import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserDocument } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "./role.enum";
import { UpdateUserDto } from "./dto/update-users.dto";
import { UserRepository } from "./users.repository";


@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }

    async findOne(id: string): Promise<UserDocument | null> {
        return this.userRepository.findById(id);
    }

    async delete(id: string): Promise<UserDocument | null> {
        return this.userRepository.findById(id);
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userRepository.find();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userRepository.findByEmail(email);
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            return this.userRepository.create(createUserDto)
        } catch (error) {
            throw new Error("Erreur de création de l'utilisateur")
        }


    }

    async update(updateUserDto: UpdateUserDto) {
        const userToUpdate = await this.userRepository.findById(updateUserDto._id)
        if (!userToUpdate) {
            throw new NotFoundException(`User with id: ${updateUserDto._id} not found`)
        }
        return this.userRepository
            .update(updateUserDto._id, updateUserDto)
            ;

    }

    async updateRole(id: string, role: Role) {
        const userToUpdate = this.userRepository.findById(id)
        if (!userToUpdate) {
            throw new NotFoundException(`User with id: ${id} not found`)
        }
        return this.userRepository
            .update(id, { role: role })
            ;

    }

}

