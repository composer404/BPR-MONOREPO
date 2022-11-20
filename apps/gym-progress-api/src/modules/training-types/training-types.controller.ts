import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TrainingTypesService } from './training-types.service';
import { TrainingType } from '@prisma/client';
import { TrainingTypeInputClass } from 'src/models/training-types.model';
import { CreatedObjectResponse } from 'src/models';

@ApiTags(`TRAINING TYPES ACTIONS`)
@Controller(`training-types`)
export class TrainingTypesController {
    constructor(private readonly trainingTypesService: TrainingTypesService) {}

    @Get('/all')
    async getAllTrainingTypes(): Promise<TrainingType[] | null> {
        return this.trainingTypesService.getAllTrainingTypes();
    }

    @Get(':id')
    async findTrainingTypeById(@Param() params: any): Promise<TrainingType | null> {
        return this.trainingTypesService.getTrainingTypeById(params.id);
    }

    @Get('activity/:id')
    async findTrainingTypeByActivityId(@Param() params: any): Promise<TrainingType | null> {
        return this.trainingTypesService.getTrainingTypeByActivityId(params.id);
    }

    @Post()
    async addTrainingType(@Body() input: TrainingTypeInputClass): Promise<CreatedObjectResponse | null> {
        return this.trainingTypesService.addTrainingType(input);
    }

    @Post(`/initial`)
    async initialLoad(@Body() input: TrainingTypeInputClass[]): Promise<boolean> {
        return this.trainingTypesService.initialLoad(input);
    }

    @Delete(`:id`)
    async deleteTrainingType(@Param() params: any): Promise<boolean> {
        return this.trainingTypesService.deleteTrainingType(params.id);
    }
}
