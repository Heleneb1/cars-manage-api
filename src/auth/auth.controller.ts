import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    @Post('register')
    async register(@Body() body: { email: string, password: string, firstName: string, lastName: string }) {
        const existingUser = await this.usersService.findByEmail(body.email);
        if (existingUser) {
            return { message: 'User already exists' };
        }
        if (!body.email || !body.password || !body.firstName || !body.lastName) {
            return { message: 'All fields are required' };
        }
        const hashedPassword = await this.authService.hashPassword(body.password);

        const newUserDto: CreateUserDto = {
            email: body.email,
            password: hashedPassword,
            firstName: body.firstName, // Add appropriate value
            lastName: body.lastName // Add appropriate value
        };
        console.log(newUserDto);
        console.log(body)
        const newUser = await this.usersService.create(newUserDto);
        return newUser;
    }

    @Post('login')
    async login(@Body() body: { email: string, password: string }) {
        const user = await this.usersService.findByEmail(body.email);
        if (!user) {
            return { message: 'User not found' };
        }
        const isPasswordValid = await this.authService.comparePasswords(body.password, user.password);
        if (!isPasswordValid) {
            return { message: 'Invalid password' };
        }
        const token = await this.authService.generateToken(user.id, user.role);
        return { token };

    }
    @Post('logout')
    async logout() {
        return { message: 'Logged out' };
    }
}
