import * as argon2 from 'argon2';

import {
    CreatedObjectResponse,
    ERROR_CODES,
    PasswordInput,
    PrismaErrorResponse,
    SignUpInput,
    UserUpdateInput,
} from '../../models';
import { Prisma, User } from '@prisma/client';

import { IUserService } from 'src/interfaces/users-service.interfaces';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UsersService implements IUserService {
    private database: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.user;
    }

    /* ----------------------------- SELECT USER ----------------------------- */

    async findUserById(id: string): Promise<User | null> {
        const prismaUser = await this.database
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
            });

        if (!prismaUser) {
            return null;
        }

        delete prismaUser.password;
        return prismaUser;
    }
    async findUserByEmail(email: string, withPassword?: boolean): Promise<User | null> {
        const prismaUser = await this.database
            .findFirst({
                where: {
                    email,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
            });

        if (!prismaUser) {
            return null;
        }
        if (!withPassword) {
            delete prismaUser.password;
        }
        return prismaUser;
    }

    /* ----------------------------- CREATE USER ----------------------------- */

    async createUser(input: SignUpInput): Promise<CreatedObjectResponse | PrismaErrorResponse | null> {
        const prismaUser = await this.database
            .create({
                data: {
                    ...input,
                    password: await argon2.hash(input.password),
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                if (err.code === `P2002` && err.meta.target[0] === `email`) {
                    return ERROR_CODES.notUniqueEmail;
                }

                return null;
            });

        if (prismaUser === ERROR_CODES.notUniqueEmail) {
            return {
                code: ERROR_CODES.notUniqueEmail,
            };
        }

        if (prismaUser === ERROR_CODES.notUniqueLogin) {
            return {
                code: ERROR_CODES.notUniqueLogin,
            };
        }

        if (!prismaUser) {
            return null;
        }

        return {
            id: prismaUser.id,
        };
    }

    /* ------------------------------- UPDATE USER ------------------------------ */

    async updatePassword(userId: string, input: PasswordInput): Promise<boolean> {
        const result = await this.database
            .update({
                where: {
                    id: userId,
                },
                data: {
                    password: await argon2.hash(input.password),
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return false;
            });

        if (!result) {
            return false;
        }
        return true;
    }

    async updateUser(userId: string, input: UserUpdateInput): Promise<boolean> {
        const result = await this.database
            .update({
                where: {
                    id: userId,
                },
                data: {
                    ...input,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return false;
            });

        if (!result) {
            return false;
        }
        return true;
    }

    /* ------------------------------- DELETE USER ------------------------------ */

    async deleteUser(userId: string): Promise<boolean> {
        const result = await this.database
            .delete({
                where: {
                    id: userId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return false;
            });
        if (!result) {
            return false;
        }
        return true;
    }
}
