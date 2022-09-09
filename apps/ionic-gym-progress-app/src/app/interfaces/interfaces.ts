export interface Token {
    accessToken: string;
}

export interface UserProfile {
    id: string;
    login: string;
}

export interface SignUpInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    height: number;
    weight: number;
    sex: string;
    age: number;
    avatar: string;
}

export enum ERROR_CODES {
    notUniqueLogin = `notUniqueLogin`,
    notUniqueEmail = `notUniqueEmail`,
}


export interface BPRApiCreatedObject {
    id: string;
}

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

export enum BPR_ERROR_CODES {
    unauthorized = `unauthorized`,
    internal = `internal`,
}