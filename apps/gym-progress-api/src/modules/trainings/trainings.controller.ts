import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { TrainingInput } from 'src/models/training.model';
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
    async getTrainingByUserId(@Request() req: BPRRequest, @Param() params: any): Promise<Training[] | null> {
        return this.trainingService.getTrainingsForUser(req.user.id, params.gymId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTraining(
        @Request() req: BPRRequest,
        @Body() training: TrainingInput,
    ): Promise<CreatedObjectResponse | null> {
        return this.trainingService.createTraining(req.user.id, training);
    }

    @UseGuards(JwtAuthGuard)
    @Put(`:id`)
    async updateTraining(@Param() params: any, @Body() training: TrainingInput): Promise<boolean> {
        return this.trainingService.updateTraining(params.id, training);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(`:id`)
    async deleteTraining(@Param() params: any): Promise<boolean> {
        return this.trainingService.deleteTraining(params.id);
    }
}
