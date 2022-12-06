import { ApiProperty } from '@nestjs/swagger';

/* ------------------------------- INTERFACES ------------------------------- */

export interface ExerciseTypeInput {
    id?: string;
    activityId: string;
    name: string;
}

/* --------------------------------- CLASSES -------------------------------- */

export class ExerciseTypeInputClass {
    @ApiProperty()
    activityId: string;
    @ApiProperty()
    name: string;
}
