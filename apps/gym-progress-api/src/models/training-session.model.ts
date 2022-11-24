/* ------------------------------- INTERFACES ------------------------------- */

import { ApiProperty } from '@nestjs/swagger';

export class SessionExerciseInput {
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
    @ApiProperty()
    burnedCalories: number;
    @ApiProperty()
    completed: boolean;
    @ApiProperty()
    timeInMinutes: number;
}

export class TrainingSessionInput {
    @ApiProperty()
    completed: boolean;
}
