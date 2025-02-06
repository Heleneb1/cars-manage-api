import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async generateToken(userId: string): Promise<string> {
        return this.jwtService.sign({ userId });
    }
    async verifyToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}

