import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/users/role.enum";
import { AuthService } from "./auth.service";
import { ROLES_KEY } from "./roles.decorater";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly authService: AuthService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            console.log('Token reçu:', token);
            const user = await this.authService.verifyToken(token);
            console.log('Utilisateur décodé:', user);
            request.user = user;

            if (!user || !requiredRoles.includes(user.role)) {
                console.log('Accès refusé. Rôle requis:', requiredRoles, 'Rôle de l\'utilisateur:', user.role);
                throw new ForbiddenException('Access denied');
            }

            return true;
        } catch (err) {
            console.log('Erreur de vérification du token:', err);
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: any): string | null {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.split(' ')[1];
    }
}