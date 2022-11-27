import { Prisma, SessionExercise, TrainingSession } from '@prisma/client';
import { SessionExerciseInput, TrainingSessionInput } from 'src/models/training-session.model';

import { CreatedObjectResponse } from 'src/models';
import { ExercisesService } from '../exercises';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { TrainingsService } from '../trainings';

@Injectable()
export class TrainingSessionsService {
    private database: Prisma.TrainingSessionDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    private sessionExerciseDatabase: Prisma.SessionExerciseDelegate<
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation
    >;

    constructor(
        private readonly prismaService: PrismaService,
        private readonly exerciseService: ExercisesService,
        private readonly trainingService: TrainingsService,
    ) {
        this.database = this.prismaService.trainingSession;
        this.sessionExerciseDatabase = this.prismaService.sessionExercise;
    }

    async createTrainingSession(userId: string, trainingId: string): Promise<CreatedObjectResponse | null> {
        const trainingResult = await this.trainingService.getTrainingById(trainingId);
        if (!trainingResult) {
            return null;
        }

        const result = await this.database
            .create({
                data: {
                    userId,
                    gymId: trainingResult.gymId,
                    trainingId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!result) {
            return null;
        }

        const exercises = await this.exerciseService.getExercisesForTraining(trainingId);

        const promises = exercises.map(async (exercise) => {
            delete exercise.trainingId;
            delete exercise.id;

            const promises = await this.sessionExerciseDatabase.create({
                data: {
                    ...exercise,
                    trainingSessionId: result.id,
                },
            });
            return promises;
        });

        const exerciseResult = await Promise.all(promises);

        if (!exerciseResult) {
            return null;
        }

        return {
            id: result.id,
        };
    }

    async updateSessionExercise(id: string, input: Partial<SessionExerciseInput>): Promise<boolean> {
        const result = await this.sessionExerciseDatabase
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

    async deleteTrainingSession(id: string): Promise<boolean> {
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

    async updateTrainingSession(id: string, input: Partial<TrainingSessionInput>): Promise<boolean> {
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

    async getSessionExerciseById(id: string): Promise<SessionExercise | null> {
        const result = await this.sessionExerciseDatabase
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        return result;
    }

    async getTrainingSessionById(id: string): Promise<TrainingSession | null> {
        const result = await this.database
            .findFirst({
                where: {
                    id,
                },
                include: {
                    sessionExercises: true,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        return result;
    }

    async getTrainingSessionsForUser(userId: string): Promise<TrainingSession[] | null> {
        const result = await this.database
            .findMany({
                where: {
                    userId,
                },
                include: {
                    sessionExercises: true,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        return result;
    }

    async getSessionsByIndex(startIndex: string, userId: string): Promise<TrainingSession[] | null> {
        return this.database
            .findMany({
                skip: parseInt(startIndex, 10) + 1,
                take: 10,
                where: {
                    userId,
                },
                orderBy: {
                    createdAt: `desc`,
                },
                include: {
                    sessionExercises: true,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });
    }

    async getSessionsByTimePeriod(
        startDate: string,
        endDate: string,
        userId: string,
    ): Promise<TrainingSession[] | null> {
        return this.database
            .findMany({
                where: {
                    userId,
                    createdAt: {
                        lte: endDate,
                        gte: startDate,
                    },
                },
                include: {
                    sessionExercises: true,
                },
                orderBy: {
                    createdAt: `desc`,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });
    }
}
