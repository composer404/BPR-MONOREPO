import * as argon2 from 'argon2';

import { Administrator, User } from '@prisma/client';
import { CreatedObjectResponse, PrismaErrorResponse, SignUpInput } from '../../models';

import { IAuthService } from 'src/interfaces/auth-service.interface';
import { IGymsService } from 'src/interfaces/gyms-service.interfaces';
import { IUserService } from 'src/interfaces/users-service.interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: IUserService,
        private readonly gymService: IGymsService,
    ) {}

    async validateAdmin(login: string, password: string): Promise<Administrator | null> {
        /* ---------------------------- ADMIN VALIDATION ---------------------------- */

        const admin = await this.gymService.findAdministratorByLogin(login);

        if (!admin) {
            return null;
        }

        /* --------------------------- PASSWORD VALIDATION -------------------------- */

        const passwordValidation = await argon2.verify(admin.password, password);
        if (!passwordValidation) {
            return null;
        }

        return { password, ...admin };
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        /* ----------------------------- USER VALIDATION ---------------------------- */

        const user = await this.userService.findUserByEmail(email, true);
        if (!user) {
            return null;
        }

        /* --------------------------- PASSWORD VALIDATION -------------------------- */

        const passwordValidation = await argon2.verify(user.password, password);
        if (!passwordValidation) {
            return null;
        }

        return { password, ...user };
    }

    async login(user: any): Promise<any> {
        /* -------------------------- GENERATING JWT TOKEN -------------------------- */
        if (!user) {
            return null;
        }

        const payload = {
            email: user.email,
            sub: user.id,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async loginAdmin(admin: any): Promise<any> {
        /* -------------------------- GENERATING JWT TOKEN -------------------------- */
        if (!admin) {
            return null;
        }

        const payload = {
            login: admin.login,
            sub: admin.id,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async registry(userInput: SignUpInput): Promise<CreatedObjectResponse | PrismaErrorResponse | null> {
        return this.userService.createUser(userInput);
    }
}
