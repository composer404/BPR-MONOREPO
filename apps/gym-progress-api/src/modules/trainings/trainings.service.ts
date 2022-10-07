import { Prisma, Training } from '@prisma/client';

import { CreatedObjectResponse } from 'src/models';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { TrainingInput } from 'src/models/training.model';

@Injectable()
export class TrainingsService {
    private database: Prisma.TrainingDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.training;
    }

    async getTrainingsForUser(userId: string, gymId: string): Promise<Training[] | null> {
        const trainings = await this.database
            .findMany({
                where: {
                    userId,
                    gymId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!trainings) {
            return [];
        }

        return trainings;
    }

    async getTrainingById(id: any): Promise<Training | null> {
        const training = await this.database
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!training) {
            return null;
        }

        return training;
    }

    async createTraining(userId: string, body: TrainingInput): Promise<CreatedObjectResponse | null> {
        const result = await this.database
            .create({
                data: {
                    ...body,
                    userId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        return {
            id: result.id,
        };
    }

    async updateTraining(id: any, body: TrainingInput): Promise<boolean> {
        const result = await this.database
            .update({
                where: {
                    id,
                },
                data: {
                    ...body,
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

    async deleteTraining(id: string): Promise<boolean> {
        const result = await this.database
            .delete({
                where: {
                    id,
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
}
