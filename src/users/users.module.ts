import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users.schema";
import { UsersController } from "./users.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserRepository } from "./users.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule)
    ],
    providers: [UsersService, UserRepository],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule { }