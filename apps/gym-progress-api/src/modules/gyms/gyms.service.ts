import { CreatedObjectResponse, GymInput, PrismaErrorResponse } from 'src/models';
import { Gym, Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class GymsService {
    private database: Prisma.GymDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.gym;
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

    async findGymByName(name: string): Promise<Gym | null> {
        const prismaGym = await this.database
            .findFirst({
                where: {
                    name,
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

    async createGym(input: GymInput): Promise<CreatedObjectResponse | PrismaErrorResponse | null> {
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
}
