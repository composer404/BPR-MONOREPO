/* --------------------------------- CLASSES -------------------------------- */

import { ApiProperty } from '@nestjs/swagger';

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
