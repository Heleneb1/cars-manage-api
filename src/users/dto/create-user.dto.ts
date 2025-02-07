import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "../role.enum";

export class CreateUserDto {
    @IsNotEmpty()// ne peut pas être vide
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;


}