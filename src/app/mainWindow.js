import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createMainWindow () {
    
    let mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        frame: true,
        autoHideMenuBar: false,
        show: false,
        webPreferences: {
            // nodeIntegration: true,打开node集成
            // contextIsolation: false,关闭上下文隔离
            preload: path.join(__dirname,'/../preload.js'),
        }
    });

    mainWindow.loadFile(path.join(__dirname,'/../renderer/renderer.html'));

    mainWindow.on('close', function (event) {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
        return false;
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    return mainWindow;
};


export default createMainWindow ;