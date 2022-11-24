/* --------------------------------- CLASSES -------------------------------- */

import { ApiProperty } from '@nestjs/swagger';

export class ExerciseInput {
    @ApiProperty()
    title: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    exercise_type: string;
    @ApiProperty()
    quantity?: string;
    @ApiProperty()
    muscle_group: string;
    @ApiProperty()
    trainingMachineId: string;
    @ApiProperty()
    estimatedTimeInMinutes: number;
}
