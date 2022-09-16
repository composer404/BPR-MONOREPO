/* eslint-disable @typescript-eslint/naming-convention */
export interface Token {
    accessToken: string;
}

export interface UserProfile {
    id: string;
    email: string;
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

export interface DialogResponse {
    data: any;
    role: string;
}

export interface ConfirmDialogInput {
    header: string;
    confirmFn?: any;
    cancelFn?: any;
    confirmText?: string;
    confirmRole?: string;
    cancelText?: string;
    cancelRole?: string;
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
