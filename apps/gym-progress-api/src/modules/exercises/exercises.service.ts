import { Exercise, Prisma, Training } from '@prisma/client';

import { CreatedObjectResponse } from 'src/models';
import { ExerciseInput } from 'src/models/exercise.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ExercisesService {
    private database: Prisma.ExerciseDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.exercise;
    }

    async getExercisesForTraining(trainingId: string): Promise<Exercise[] | null> {
        const exercises = await this.database
            .findMany({
                where: {
                    trainingId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!exercises) {
            return [];
        }

        return exercises;
    }

    async getExerciseById(id: any): Promise<Exercise | null> {
        const exercise = await this.database
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!exercise) {
            return null;
        }

        return exercise;
    }

    async createExercise(trainingId: string, body: ExerciseInput): Promise<CreatedObjectResponse | null> {
        const result = await this.database
            .create({
                data: {
                    ...body,
                    trainingId,
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

    async updateExercise(id: string, body: ExerciseInput): Promise<boolean> {
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

    async deleteExercise(id: string): Promise<boolean> {
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
