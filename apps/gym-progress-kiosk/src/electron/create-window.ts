import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

import { BrowserWindow, app, ipcMain } from 'electron';

import { ElectronOptions } from './electron-options.interface';
import { exec } from 'child_process';
import { print } from 'pdf-to-printer';

export const createWindow = (options: ElectronOptions) => {
    initListeners();

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

const initListeners = () => {
    ipcMain.on(`print`, async (event, ...args) => {
        createTempDocumentsDirectory();
        const result = await generateFileFromEJS(args);

        event.sender.send(`print-reply`, {
            result,
        });
    });
};

const createTempDocumentsDirectory = () => {
    if (!fs.existsSync(path.resolve(app.getPath(`temp`), `./gym-progress/files`))) {
        fs.mkdirSync(path.resolve(app.getPath(`temp`), `./gym-progress/files`), { recursive: true });
    }
};

const generateFileFromEJS = async (args: any) => {
    const promises = await Promise.all([wkHtmlToPdfWithFile(args)]);
    const [file] = promises;
    const printingResult = await print((file as any).filePath).catch((err: any) => {
        return err;
    });

    if (printingResult === undefined) {
        return true;
    }
    return false;
};

const wkHtmlToPdfWithFile = async (args: any) => {
    if (!fs.existsSync(path.resolve(app.getPath(`temp`), `./gym-progress/generated`))) {
        fs.mkdirSync(path.resolve(app.getPath(`temp`), `./gym-progress/generated`), { recursive: true });
    }

    if (!fs.existsSync(path.resolve(app.getPath(`temp`), `./gym-progress/files`))) {
        fs.mkdirSync(path.resolve(app.getPath(`temp`), `./gym-progress/files`), { recursive: true });
    }

    const fileName = Date.now();

    const pdfFilePath = path.resolve(app.getPath(`temp`), `./files/${fileName}.pdf`);
    const htmlFilePath = path.resolve(app.getPath(`temp`), `./generated/${fileName}.html`);
    const wkhtmltopdfPath = path.resolve(app.getAppPath(), `./src/electron/bin/wkhtmltopdf.exe`);

    const ejsFile = fs.readFileSync(path.resolve(app.getAppPath(), `./src/electron/template/qr.ejs`), {
        encoding: `utf-8`,
    });

    const template = ejs.render(ejsFile, {
        data: args[0].data,
    });

    try {
        fs.writeFileSync(htmlFilePath, template, `utf-8`);
    } catch (err) {
        console.log(`ERROR`, err);
    }

    const result = execPromise(`more ${htmlFilePath} | "${wkhtmltopdfPath}" -B 25mm - ${pdfFilePath}`)
        .then(() => {
            return fs.readFile(pdfFilePath, {}, (err) => {
                console.log(`READFILE ERR`, err);
            });
        })
        .then((file) => {
            return {
                file,
                filePath: pdfFilePath,
            };
        })
        .catch((err) => {
            console.log(`ERROR`, err);
        });
    return result;
};

const execPromise = async (command: string) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
                return;
            }
            resolve(stdout);
        });
    });
};
