import { Prisma, TrainingType } from '@prisma/client';

import { CreatedObjectResponse } from 'src/models';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { TrainingTypeInput } from 'src/models/training-types.model';

@Injectable()
export class TrainingTypesService {
    private database: Prisma.TrainingTypeDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.trainingType;
    }

    async getAllTrainingTypes(): Promise<TrainingType[] | null> {
        const response = await this.database.findMany().catch((err) => {
            console.log(`[API]`, err);
        });

        if (!response) {
            return null;
        }
        return response;
    }

    async getTrainingTypeById(id: string): Promise<TrainingType | null> {
        const response = await this.database
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
            });

        if (!response) {
            return null;
        }
        return response;
    }

    async getTrainingTypeByActivityId(activityId: string): Promise<TrainingType | null> {
        const response = await this.database
            .findFirst({
                where: {
                    activityId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
            });

        if (!response) {
            return null;
        }
        return response;
    }

    async addTrainingType(input: TrainingTypeInput): Promise<CreatedObjectResponse | null> {
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

    async deleteTrainingType(id: string): Promise<boolean> {
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

    async initialLoad(input: TrainingTypeInput[]): Promise<boolean> {
        const result = await this.database
            .createMany({
                data: input,
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
