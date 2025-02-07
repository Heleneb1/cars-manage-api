import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserDocument } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "./role.enum";
import { UpdateUserDto } from "./dto/update-users.dto";
import { UpdateCarDto } from "src/cars/dto/update-car.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOne(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async delete(id: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel({
            ...createUserDto,
            role: Role.User
        });

        return createdUser.save();
    }

    async update(updateUserDto: UpdateUserDto) {
        const userToUpdate = await this.userModel.findById(updateUserDto._id).exec()
        if (!userToUpdate) {
            throw new NotFoundException(`User with id: ${updateUserDto._id} not found`)
        }
        return this.userModel
            .findByIdAndUpdate(updateUserDto._id, updateUserDto, { new: true })
            .exec();

    }

    async updateRole(id: string, role: Role) {
        const userToUpdate = await this.userModel.findById(id).exec()
        if (!userToUpdate) {
            throw new NotFoundException(`User with id: ${id} not found`)
        }
        return this.userModel
            .findByIdAndUpdate(id, { role: role }, { new: true })
            .exec();

    }

}