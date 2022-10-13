import * as electron from 'electron';

import { Injectable } from '@angular/core';
import { TrainingMachines } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root',
})
export class ElectronService {
    electron: typeof electron | undefined;

    constructor() {
        if (!this.electron) {
            if (window && window.require) {
                this.electron = window.require(`electron`);
            }
        }
    }

    print(trainingMachine: TrainingMachines): Promise<boolean> | undefined {
        if (!this.electron) {
            return undefined;
        }

        this.electron.ipcRenderer.send(`print`, {
            data: {
                qr: trainingMachine.qrBase64,
                name: trainingMachine.name || `-`,
                location: trainingMachine.location || `-`,
            },
        });

        return new Promise<boolean>((resolve) => {
            this.electron?.ipcRenderer.on(`print-reply`, (event, args) => {
                resolve(args.result);
            });
        });
    }
}
