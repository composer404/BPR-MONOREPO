/* eslint-disable @typescript-eslint/no-var-requires */
import * as path from 'path';

import { BrowserWindow } from 'electron';
import { ElectronOptions } from './electron-options.interface';

export const createWindow = (options: ElectronOptions) => {
    const size = {
        width: 1200,
        height: 1920,
    };

    // Create the browser window.
    const win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        frame: false,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            allowRunningInsecureContent: Boolean(options.cli.serve),
        },
    });

    if (options.cli.serve) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require(`electron-reloader`)(module);
        } catch {
            //
        }

        void win.loadURL(`http://localhost:${options.angularJsonProject.architect.serve.options.port}`);
        return;
    }

    const indexHtmlPath = path.join(
        options.projectPath,
        options.angularJsonProject.architect.build.options.outputPath,
        `index.html`,
    );

    void win.loadURL(`file://${indexHtmlPath}`);
};
