import { Prisma, TrainingMachine } from '@prisma/client';

import { CreatedObjectResponse } from 'src/models';
import { DateTime } from 'luxon';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { SessionsGateway } from '../socket/sessions.gateway';
import { TraininMachineInput } from 'src/models/training-machines.model';
import { TrainingSessionsService } from '../training-sessions';

@Injectable()
export class TrainingMachinesService {
    private database: Prisma.TrainingMachineDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;
    constructor(
        private readonly prismaService: PrismaService,
        private readonly sessionsGateway: SessionsGateway,
        private readonly trainingSessionService: TrainingSessionsService,
    ) {
        this.database = this.prismaService.trainingMachine;
    }

    async getTrainingMachinesByGymId(gymId: any): Promise<TrainingMachine[] | null> {
        const trainingMachine = await this.database
            .findMany({
                where: {
                    gymId,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!trainingMachine) {
            return null;
        }

        return trainingMachine;
    }

    async createTrainingMachine(gymId: string, body: TraininMachineInput): Promise<CreatedObjectResponse | null> {
        const result = await this.database
            .create({
                data: {
                    ...body,
                    availability: false,
                    class: ``,
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

    async toggleTrainingMachineState(
        id: string,
        exerciseId: string,
        status: boolean,
        gymId: string,
        userId: string,
    ): Promise<boolean> {
        const selectedExercise = await this.trainingSessionService.getSessionExerciseById(exerciseId);
        this.sessionsGateway.notifyAboutChangeOfTrainingMachine(gymId, userId, {
            timeframeInMinutes: selectedExercise.estimatedTimeInMinutes,
            trainingMachineId: id,
            stringStartedTimestamp: DateTime.now().toISO(),
            status,
        });

        const result = await this.database
            .update({
                where: {
                    id,
                },
                data: {
                    availability: status,
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

    async editTrainingMachine(id: any, body: TraininMachineInput): Promise<boolean> {
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

    async deleteTrainingMachine(id: any) {
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

    async getTrainingMachineById(id: any): Promise<TrainingMachine | null> {
        const trainingMachine = await this.database
            .findFirst({
                where: {
                    id,
                },
            })
            .catch((err) => {
                console.log(`[API]`, err);
                return null;
            });

        if (!trainingMachine) {
            return null;
        }

        return trainingMachine;
    }
}
