import { ExerciseType, Prisma } from '@prisma/client';

import { CreatedObjectResponse } from 'src/models';
import { ExerciseTypeInput } from 'src/models/exercise-types.model';
import { IExerciseTypesService } from 'src/interfaces/exercise-types.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ExerciseTypesService implements IExerciseTypesService {
    private database: Prisma.ExerciseTypeDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.exerciseType;
    }

    async getAllExerciseTypes(): Promise<ExerciseType[] | null> {
        const response = await this.database.findMany().catch((err) => {
            console.log(`[API]`, err);
        });

        if (!response) {
            return null;
        }
        return response;
    }

    async getExerciseTypeById(id: string): Promise<ExerciseType | null> {
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

    async getExerciseTypeByActivityId(activityId: string): Promise<ExerciseType | null> {
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

    async addExerciseType(input: ExerciseTypeInput): Promise<CreatedObjectResponse | null> {
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

    async deleteExerciseType(id: string): Promise<boolean> {
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

    async initialLoad(input: ExerciseTypeInput[]): Promise<boolean> {
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
