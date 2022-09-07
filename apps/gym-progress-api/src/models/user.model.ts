import { ApiProperty } from '@nestjs/swagger';

/* ------------------------------- INTERFACES ------------------------------- */

export interface BPRUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    sex: string;
    height: number;
    weight: number;
    age: number;
}

export interface UserOutput {
    id: string;
    email: string;
}

export interface BPRRequest {
    user: UserOutput;
}

/* --------------------------------- CLASSES -------------------------------- */

export class UserUpdateInput {
    @ApiProperty()
    password: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    age: number;
    @ApiProperty()
    sex: string;
    @ApiProperty()
    height: number;
    @ApiProperty()
    weight: number;
    @ApiProperty()
    avatar: string;
}

export class PasswordInput {
    @ApiProperty()
    password: string;
}

export class SEPFollowInput {
    @ApiProperty()
    followingId: string;
}
