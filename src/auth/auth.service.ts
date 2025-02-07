import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/users/role.enum';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async generateToken(userId: string, role: any): Promise<string> {
        return this.jwtService.sign({ sub: userId, role: role });
    }
    async verifyToken(token: string): Promise<any> {

        return this.jwtService.verify(token);
    }

}

