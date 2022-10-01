/* --------------------------------- CLASSES -------------------------------- */

import { ApiProperty } from '@nestjs/swagger';

export class ExerciseInput {
    @ApiProperty()
    title: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    training_type: string;
    @ApiProperty()
    quantity?: number;
    @ApiProperty()
    muscle_group: string;
    @ApiProperty()
    trainingMachineId: string;
}
