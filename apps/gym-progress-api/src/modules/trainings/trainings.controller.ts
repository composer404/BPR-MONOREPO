import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AdminJwtGuard, JwtAuthGuard } from '../auth/guards';
import { TrainingInput, TrainingWithExercisesInput } from 'src/models/training.model';
import { TrainingsService } from './trainings.service';
import { BPRRequest, CreatedObjectResponse } from 'src/models';
import { Training } from '@prisma/client';

@ApiTags(`TRAININGS`)
@Controller(`trainings`)
export class TrainingsController {
    constructor(private readonly trainingService: TrainingsService) {}

    @UseGuards(JwtAuthGuard)
    @Get(`:id`)
    async getTrainingById(@Param() params: any): Promise<Training | null> {
        return this.trainingService.getTrainingById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`user/all/:gymId`)
    async getUserTrainingForGym(@Request() req: BPRRequest, @Param() params: any): Promise<Training[] | null> {
        return this.trainingService.getUserTrainingsForGym(req.user.id, params.gymId);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Get(`admin/all/:gymId`)
    async getTrainingCreatedByAdmin(@Param() params: any): Promise<Training[] | null> {
        return this.trainingService.getTrainingCreatedByAdmin(params.gymId);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Post()
    async createTraining(
        @Request() req: BPRRequest,
        @Body() training: TrainingInput,
    ): Promise<CreatedObjectResponse | null> {
        return this.trainingService.createTraining(req.user.id, training);
    }

    @UseGuards(JwtAuthGuard)
    @Post(`withExercises`)
    async createTrainingWithExercises(
        @Request() req: BPRRequest,
        @Body() training: TrainingWithExercisesInput,
    ): Promise<CreatedObjectResponse | null> {
        return this.trainingService.createTrainingWithExercises(req.user.id, training);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Put(`:id`)
    async updateTraining(@Param() params: any, @Body() training: TrainingInput): Promise<boolean> {
        return this.trainingService.updateTraining(params.id, training);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Delete(`:id`)
    async deleteTraining(@Param() params: any): Promise<boolean> {
        return this.trainingService.deleteTraining(params.id);
    }
}
