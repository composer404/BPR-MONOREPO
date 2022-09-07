import * as argon2 from 'argon2';

import { CreatedObjectResponse, PrismaErrorResponse, SignUpInput } from '../../models';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) {}

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

    async registry(userInput: SignUpInput): Promise<CreatedObjectResponse | PrismaErrorResponse | null> {
        return this.userService.createUser(userInput);
    }
}
