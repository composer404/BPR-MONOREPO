import { IInfoService } from '../interfaces/info-service.interface';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class InfoService implements IInfoService {
    constructor(private messageService: MessageService) {}

    success(description: string): void {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: description,
        });
    }

    error(description: string): void {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: description,
        });
    }
}
