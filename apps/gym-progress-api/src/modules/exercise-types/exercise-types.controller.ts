import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExerciseTypesService } from './exercise-types.service';
import { ExerciseType } from '@prisma/client';
import { ExerciseTypeInputClass } from 'src/models/exercise-types.model';
import { CreatedObjectResponse } from 'src/models';

@ApiTags(`EXERCISE TYPES ACTIONS`)
@Controller(`exercise-types`)
export class ExerciseTypesController {
    constructor(private readonly exerciseTypesService: ExerciseTypesService) {}

    @Get('/all')
    async getAllExerciseTypes(): Promise<ExerciseType[] | null> {
        return this.exerciseTypesService.getAllExerciseTypes();
    }

    @Get(':id')
    async findExerciseTypeById(@Param() params: any): Promise<ExerciseType | null> {
        return this.exerciseTypesService.getExerciseTypeById(params.id);
    }

    @Get('activity/:id')
    async findExerciseTypeByActivityId(@Param() params: any): Promise<ExerciseType | null> {
        return this.exerciseTypesService.getExerciseTypeByActivityId(params.id);
    }

    @Post()
    async addExerciseType(@Body() input: ExerciseTypeInputClass): Promise<CreatedObjectResponse | null> {
        return this.exerciseTypesService.addExerciseType(input);
    }

    @Post(`/initial`)
    async initialLoad(@Body() input: ExerciseTypeInputClass[]): Promise<boolean> {
        return this.exerciseTypesService.initialLoad(input);
    }

    @Delete(`:id`)
    async deleteExerciseType(@Param() params: any): Promise<boolean> {
        return this.exerciseTypesService.deleteExerciseType(params.id);
    }
}
