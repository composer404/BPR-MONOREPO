import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Request, Post, Put, UseGuards } from '@nestjs/common';
import { TrainingMachineChangeInput, TraininMachineInput } from 'src/models/training-machines.model';
import { AdminJwtGuard } from '../auth/guards/admin-jwt.guard';
import { JwtAuthGuard } from '../auth/guards';
import { TrainingMachine } from '@prisma/client';
import { BPRRequest, CreatedObjectResponse } from 'src/models';
import { ITrainingMachineService } from 'src/interfaces/training-machines-service.interface';

@ApiTags(`TRAINING MACHINES ACTIONS`)
@Controller(`training-machines`)
export class TrainingMachinesController {
    constructor(private readonly trainingMachinesService: ITrainingMachineService) {}

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Get(`:id`)
    async getTrainingMachineById(@Param() params: any): Promise<TrainingMachine | null> {
        return this.trainingMachinesService.getTrainingMachineById(params.id);
    }

    @UseGuards(JwtAuthGuard, AdminJwtGuard)
    @Get(`gym/:id`)
    async getTrainingMachinesByGymId(@Param() params: any): Promise<TrainingMachine[] | null> {
        return this.trainingMachinesService.getTrainingMachinesByGymId(params.id);
    }

    @UseGuards(AdminJwtGuard)
    @Post(`:gymId`)
    async createTrainingMachine(
        @Param() params: any,
        @Body() trainingMachine: TraininMachineInput,
    ): Promise<CreatedObjectResponse | null> {
        return this.trainingMachinesService.createTrainingMachine(params.gymId, trainingMachine);
    }

    @UseGuards(JwtAuthGuard)
    @Put(`:gymId/enable/:id`)
    async enableTrainingMachine(
        @Param() params: any,
        @Request() req: BPRRequest,
        @Body() body: TrainingMachineChangeInput,
    ): Promise<boolean> {
        return this.trainingMachinesService.toggleTrainingMachineState(
            params.id,
            body.exerciseId,
            true,
            params.gymId,
            req.user.id,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Put(`:gymId/disable/:id`)
    async disableTrainingMachine(
        @Param() params: any,
        @Request() req: BPRRequest,
        @Body() body: TrainingMachineChangeInput,
    ): Promise<boolean> {
        return this.trainingMachinesService.toggleTrainingMachineState(
            params.id,
            body.exerciseId,
            false,
            params.gymId,
            req.user.id,
        );
    }

    @UseGuards(AdminJwtGuard)
    @Put(`:id`)
    async updateTrainingMachine(@Param() params: any, @Body() trainingMachine: TraininMachineInput): Promise<boolean> {
        return this.trainingMachinesService.editTrainingMachine(params.id, trainingMachine);
    }

    @UseGuards(AdminJwtGuard)
    @Delete(`:id`)
    async deleteTrainingMachine(@Param() params: any): Promise<boolean> {
        return this.trainingMachinesService.deleteTrainingMachine(params.id);
    }
}
