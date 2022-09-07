import { Controller, Get, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Gym } from '@prisma/client';

import { GymsService } from './gyms.service';

@ApiTags(`GYMS ACTIONS`)
@Controller(`gyms`)
export class GymsController {
    constructor(private readonly gymsService: GymsService) {}

    @Get(':id')
    async findGymById(@Param() params: any): Promise<Gym | null> {
        return this.gymsService.findGymById(params.id);
    }

    @Get(':name')
    async findGymByName(@Param() params: any): Promise<Gym | null> {
        return this.gymsService.findGymById(params.name);
    }
}
