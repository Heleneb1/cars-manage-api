import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./users.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsersService {
    findOne(id: string): User | PromiseLike<User | null> | null {
        return this.userModel.findById(id);
    }
    delete(id: string): User | PromiseLike<User | null> | null {
        return this.userModel.findByIdAndDelete(id);
    }
    findAll(): User[] | PromiseLike<User[]> {
        return this.userModel.find();
    }
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });

    }
    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        console.log(createdUser);
        return createdUser.save();
    }

}