/* --------------------------------- CLASSES -------------------------------- */

import { ApiProperty } from '@nestjs/swagger';
import { ExerciseInput } from './exercise.model';

export class TrainingInput {
    @ApiProperty()
    gymId: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    type: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    comment?: string;
    @ApiProperty()
    isCreatedByAdmin?: boolean;
}

export class TrainingWithExercisesInput extends TrainingInput {
    @ApiProperty()
    exercises: ExerciseInput[];
}
