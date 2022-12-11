import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { UsedTrainingMachine } from './interfaces';
import { ISocketService } from 'src/interfaces/socket-service.interface';

@ApiTags(`SESSION ACTIONS`)
@Controller(`sessions`)
export class SessionsController {
    constructor(private readonly sessionGateway: ISocketService) {}

    @UseGuards(JwtAuthGuard)
    @Get(`/participants/:gymId`)
    getGymParticipantsNumber(@Param() params: any): number {
        return this.sessionGateway.getNumberOfParticipants(params.gymId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(`/machines/:gymId`)
    getGymUsedTrainingMachinesIds(@Param() param: any): UsedTrainingMachine[] {
        return this.sessionGateway.getGymUsedTrainingMachinesIds(param.gymId);
    }
}
