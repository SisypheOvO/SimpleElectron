import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: true,
        autoHideMenuBar: false,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, '/../preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            webSecurity: true,
        }
    });

    mainWindow.loadFile(path.join(__dirname, '/../renderer/renderer.html'));

    // if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    // }

    mainWindow.on('close', (event) => {
        if (!app.isQuitting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    return mainWindow;
};