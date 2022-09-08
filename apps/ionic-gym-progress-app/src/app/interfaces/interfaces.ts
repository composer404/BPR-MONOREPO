export interface Token {
    accessToken: string;
}

export interface UserProfile {
    id: string;
    login: string;
}

export interface SignUpInput {
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    avatar: string;
}

export enum API_ERROR_CODES {
    notUniqueLogin = `notUniqueLogin`,
    notUniqueEmail = `notUniqueEmail`,
}

export enum BPR_ERROR_CODES {
    unauthorized = `unauthorized`,
    internal = `internal`,
}

export interface BPRApiCreatedObject {
    id: string;
}

export interface BPRUser {
    id: string;
    createdAt: string;
    updatedAt: string;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
}