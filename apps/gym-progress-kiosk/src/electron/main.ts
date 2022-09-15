import * as minimist from 'minimist';
import * as path from 'path';

import { BrowserWindow, app } from 'electron';

import { ElectronOptions } from './electron-options.interface';
import { createWindow } from './create-window';

const main = async () => {
    const projectPath = path.resolve(__dirname, `../..`);
    const angularJson = await import(`${projectPath}/angular.json`);
    const packageJson = await import(`${projectPath}/package.json`);

    const [, angularJsonProject] = Object.entries(angularJson.projects).shift() as any;

    const options: ElectronOptions = {
        cli: minimist(process.argv.slice(2)) as any,
        angularJson,
        angularJsonProject,
        packageJson,
        projectPath: path.resolve(__dirname, `../..`),
    };

    app.on(`ready`, () => {
        return setTimeout(async () => {
            createWindow(options);
        }, 400);
    });

    // Quit when all windows are closed.
    app.on(`window-all-closed`, () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== `darwin`) {
            app.quit();
        }
    });

    app.on(`activate`, () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(options);
        }
    });
};

void main().catch((err: Error) => {
    console.error(err);
    process.exit(1);
});
