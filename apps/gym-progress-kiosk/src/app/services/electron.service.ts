import * as electron from 'electron';

import { Injectable } from '@angular/core';

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

    print(): boolean {
        if (!this.electron) {
            return false;
        }
        this.electron.ipcRenderer.send(`print`);
        return true;
    }
}
