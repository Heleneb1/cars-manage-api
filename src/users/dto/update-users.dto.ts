import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "../role.enum";

export class UpdateUserDto {

    _id: string;

    @IsNotEmpty()// ne peut pas être vide
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    role: Role

}