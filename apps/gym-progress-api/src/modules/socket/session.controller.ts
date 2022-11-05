import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { SessionsGateway } from './sessions.gateway';

@ApiTags(`SESSION ACTIONS`)
@Controller(`sessions`)
export class SessionsController {
    constructor(private readonly sessionGateway: SessionsGateway) {}

    @UseGuards(JwtAuthGuard)
    @Get(`/participants/:gymId`)
    getGymParticipantsNumber(@Param() params: any): number {
        return this.sessionGateway.getNumberOfParticipants(params.gymId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`/machines/:gymId`)
    getGymUsedTrainingMachinesNumber(@Param() params: any): number {
        return this.sessionGateway.getNumberOfUsedTrainingMachines(params.gymId);
    }

    // @UseGuards(JwtAuthGuard)
    // @Get(`/currentMachines/:gymId`)
    // getCurrentUsedTrainingMachines(@Param() params: any): UsedTrainingMachine[] {
    //     return this.sessionGateway.getNumberOfUsedTrainingMachines(params.gymId);
    // }
}
