import { ApiProperty } from '@nestjs/swagger';

/* ------------------------------- INTERFACES ------------------------------- */
export interface GymInput {
    id?: string;
    name: string;
    street: string;
    post_code: string;
    country: string;
    street_number: string;
}

export interface AdministratorInput {
    id?: string;
    login: string;
    password: string;
    information: string;
}

/* --------------------------------- CLASSES -------------------------------- */
export class AdministratorInputClass {
    @ApiProperty()
    login: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    information: string;
}

export class GymInputClass {
    @ApiProperty()
    name: string;
    @ApiProperty()
    decription: string;
    @ApiProperty()
    street: string;
    @ApiProperty()
    post_code: string;
    @ApiProperty()
    country: string;
    @ApiProperty()
    street_number: string;
}
