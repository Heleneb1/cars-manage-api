import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET, // Clé secrète (mettre dans .env)
            signOptions: { expiresIn: '1h' },
        }),
        UsersModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }