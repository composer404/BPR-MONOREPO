import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminJwtGuard, JwtAuthGuard } from '../auth/guards';
import { ExercisesService } from './exercises.service';
import { CreatedObjectResponse } from 'src/models';
import { Exercise } from '@prisma/client';
import { ExerciseInput } from 'src/models/exercise.model';

@ApiTags(`EXERCISES`)
@Controller(`exercises`)
export class ExercisesController {
    constructor(private readonly exerciseService: ExercisesService) {}

    @UseGuards(JwtAuthGuard)
    @Get(`:id`)
    async getExerciseById(@Param() params: any): Promise<Exercise | null> {
        return this.exerciseService.getExerciseById(params.id);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Get(`training/:id`)
    async getExercisesByTrainingId(@Param() params: any): Promise<Exercise[] | null> {
        return this.exerciseService.getExercisesForTraining(params.id);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Post(`:trainingId`)
    async createExercise(@Param() params: any, @Body() exercise: ExerciseInput): Promise<CreatedObjectResponse | null> {
        return this.exerciseService.createExercise(params.trainingId, exercise);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Put(`:id`)
    async updateExercise(@Param() params: any, @Body() exercise: ExerciseInput): Promise<boolean> {
        return this.exerciseService.updateExercise(params.id, exercise);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Delete(`:id`)
    async deleteExercise(@Param() params: any): Promise<boolean> {
        return this.exerciseService.deleteExercise(params.id);
    }
}
