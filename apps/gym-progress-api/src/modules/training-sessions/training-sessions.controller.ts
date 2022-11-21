import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Post, UseGuards, Request, Get, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { BPRRequest, CreatedObjectResponse } from 'src/models';
import { TrainingSessionsService } from './training-sessions.service';
import { TrainingSession } from '@prisma/client';
import { SessionExerciseInput, TrainingSessionInput } from 'src/models/training-session.model';

@ApiTags(`TRAINING SESSION ACTION`)
@Controller(`training-sessions`)
export class TrainingSessionsController {
    constructor(private readonly trainingSessionService: TrainingSessionsService) {}

    @UseGuards(JwtAuthGuard)
    @Post(`:trainingId`)
    async createTrainingSession(
        @Param() params: any,
        @Request() req: BPRRequest,
    ): Promise<CreatedObjectResponse | null> {
        return this.trainingSessionService.createTrainingSession(req.user.id, params.trainingId);
    }

    @Get(`:id`)
    async getTrainingSessionById(@Param() params: any): Promise<TrainingSession | null> {
        return this.trainingSessionService.getTrainingSessionById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTrainingSessionForUser(@Request() req: BPRRequest): Promise<TrainingSession | null> {
        return this.trainingSessionService.getTrainingSessionById(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(`/exercise/:id`)
    async updateSessionExercise(@Param() params: any, @Body() body: SessionExerciseInput): Promise<boolean> {
        return this.trainingSessionService.updateSessionExercise(params.id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Put(`:id`)
    async updateTrainingSession(@Param() params: any, @Body() body: TrainingSessionInput): Promise<boolean> {
        return this.trainingSessionService.updateTrainingSession(params.id, body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(`:id`)
    async deleteTrainingSession(@Param() params: any): Promise<boolean> {
        return this.trainingSessionService.deleteTrainingSession(params.id);
    }
}
