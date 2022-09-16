import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Gym } from '@prisma/client';
import { AdministratorInputClass, CreatedObjectResponse, GymInputClass } from 'src/models';

import { GymsService } from './gyms.service';

@ApiTags(`GYMS ACTIONS`)
@Controller(`gyms`)
export class GymsController {
    constructor(private readonly gymsService: GymsService) {}

    @Get(':id')
    async findGymById(@Param() params: any): Promise<Gym | null> {
        return this.gymsService.findGymById(params.id);
    }

    @Get('name/:name')
    async findGymByName(@Param() params: any): Promise<Gym[] | null> {
        return this.gymsService.findGymByName(params.name);
    }

    @Post(':id/administrators')
    async addAdministratorToGym(@Param() params: any, @Body() body: AdministratorInputClass) {
        return this.gymsService.addAdministratorToGym(params.id, body);
    }

    @Post()
    async createGym(@Body() input: GymInputClass): Promise<CreatedObjectResponse | null> {
        return this.gymsService.createGym(input);
    }

    @Put(':id')
    async updateGym(@Param() params: any, @Body() input: GymInputClass): Promise<boolean> {
        return this.gymsService.updateGym(params.id, input);
    }
}
