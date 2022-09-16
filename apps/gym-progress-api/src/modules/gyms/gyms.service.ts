import * as argon2 from 'argon2';

import { Administrator, Gym, Prisma } from '@prisma/client';
import { AdministratorInput, CreatedObjectResponse, GymInput } from 'src/models';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class GymsService {
    private database: Prisma.GymDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    private administratorDb: Prisma.AdministratorDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.gym;
        this.administratorDb = this.prismaService.administrator;
    }

    /* ----------------------------- SELECT GYM ----------------------------- */

    async findGymById(id: string): Promise<Gym | null> {
        const prismaGym = await this.database
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
            });

        if (!prismaGym) {
            return null;
        }
        return prismaGym;
    }

    async findGymByName(name: string): Promise<Gym[] | null> {
        const prismaGym = await this.database
            .findMany({
                where: {
                    name: {
                        startsWith: name,
                    },
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
            });

        if (!prismaGym) {
            return null;
        }
        return prismaGym;
    }

    /* ----------------------------- CREATE GYM ----------------------------- */

    async createGym(input: GymInput): Promise<CreatedObjectResponse | null> {
        const result = await this.database
            .create({
                data: {
                    ...input,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });
        if (!result) {
            return null;
        }
        return {
            id: result.id,
        };
    }

    /* ------------------------------- DELETE GYM ------------------------------- */

    async deleteGym(id: string): Promise<boolean> {
        const result = await this.database
            .delete({
                where: {
                    id,
                },
                include: {
                    administrators: true,
                    trainingMachines: true,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!result) {
            return false;
        }
        return true;
    }

    /* --------------------------------- UPDATE --------------------------------- */

    async updateGym(id: string, input: GymInput): Promise<boolean> {
        const result = await this.database
            .update({
                where: {
                    id,
                },
                data: {
                    ...input,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!result) {
            return false;
        }
        return true;
    }

    /* ------------------------ ADD ADMINISTRATOR TO GYM ------------------------ */

    async addAdministratorToGym(
        gymId: string,
        administratorInput: AdministratorInput,
    ): Promise<CreatedObjectResponse | null> {
        const result = await this.administratorDb
            .create({
                data: {
                    ...administratorInput,
                    password: await argon2.hash(administratorInput.password),
                    gymId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });
        if (!result) {
            return null;
        }

        return {
            id: result.id,
        };
    }

    /* ---------------------------- GET ADMINISTRATOR --------------------------- */

    async findAdministratorByLogin(login: string): Promise<Administrator | null> {
        const result = await this.administratorDb
            .findFirst({
                where: {
                    login,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!result) {
            return null;
        }

        return result;
    }
}
