/* --------------------------------- CLASSES -------------------------------- */

import { ApiProperty } from '@nestjs/swagger';

export class TraininMachineInput {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    location?: string;
    @ApiProperty()
    formula_for_calories?: string;
    @ApiProperty()
    video?: string;
    @ApiProperty()
    class: string;
}

export class TrainingMachineChangeInput {
    @ApiProperty()
    exerciseId: string;
}
