import { ApiProperty } from '@nestjs/swagger';

/* ------------------------------- INTERFACES ------------------------------- */

export interface TrainingTypeInput {
    id?: string;
    activityId: string;
    name: string;
}

/* --------------------------------- CLASSES -------------------------------- */

export class TrainingTypeInputClass {
    @ApiProperty()
    activityId: string;
    @ApiProperty()
    name: string;
}
