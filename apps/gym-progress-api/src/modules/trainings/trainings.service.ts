import { Prisma, Training } from '@prisma/client';
import { TrainingInput, TrainingWithExercisesInput } from 'src/models/training.model';

import { CreatedObjectResponse } from 'src/models';
import { ITrainingService } from 'src/interfaces/trainings-service.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class TrainingsService implements ITrainingService {
    private database: Prisma.TrainingDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(private readonly prismaService: PrismaService) {
        this.database = this.prismaService.training;
    }

    async getUserTrainingsForGym(userId: string, gymId: string): Promise<Training[] | null> {
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

    async getTrainingCreatedByAdmin(gymId: string): Promise<Training[] | null> {
        const result = await this.database
            .findMany({
                where: {
                    gymId,
                    isCreatedByAdmin: true,
                },
                include: {
                    exercises: true,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        return result;
    }

    async createTrainingWithExercises(userId: string, body: TrainingWithExercisesInput) {
        const exercises = body.exercises;

        exercises.forEach((exercise) => {
            delete (exercise as any).id;
            delete (exercise as any).trainingId;
        });

        delete (body as any).id;

        delete body.exercises;
        const result = await this.database
            .create({
                data: {
                    ...body,
                    userId,
                    exercises: {
                        createMany: {
                            data: exercises,
                        },
                    },
                },
                include: {
                    exercises: true,
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

    async createTraining(userId: string, body: TrainingInput): Promise<CreatedObjectResponse | null> {
        let addtionalBody = {};

        if (!body.isCreatedByAdmin) {
            addtionalBody = {
                userId,
            };
        }
        const result = await this.database
            .create({
                data: {
                    ...body,
                    ...addtionalBody,
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
