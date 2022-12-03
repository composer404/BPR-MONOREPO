import { ApiProperty } from '@nestjs/swagger';

export class SignInInput {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

export class SignUpInput {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    height: number;
    @ApiProperty()
    weight: number;
    @ApiProperty()
    sex: string;
    @ApiProperty()
    age: number;
}

export class CreatedObjectResponse {
    @ApiProperty()
    id: string;
}

export enum ERROR_CODES {
    notUniqueLogin = `notUniqueLogin`,
    notUniqueEmail = `notUniqueEmail`,
}

export class PrismaErrorResponse {
    @ApiProperty()
    code: ERROR_CODES;
}
