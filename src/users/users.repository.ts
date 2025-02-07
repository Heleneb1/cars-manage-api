import { Injectable, NotFoundException } from "@nestjs/common";
import { User, UserDocument } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { Role } from "./role.enum";
import { UpdateUserDto } from "./dto/update-users.dto";


@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async delete(id: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }

    async find(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }


    async create(userData: any): Promise<User> {
        const createdUser = new this.userModel({
            ...userData,
            role: Role.User
        });

        return createdUser.save();
    }

    async update(id: string, userData: any) {
        return this.userModel.findByIdAndUpdate(id, userData, { new: true })

    }

    async updateRole(id: string, role: Role) {

        return this.userModel
            .findByIdAndUpdate(id, { role: role }, { new: true })
            .exec();

    }

}