import { globalShortcut } from 'electron';
import mainWindow from './mainWindow.js';

function initGlobalShortcut(mainWindow) {
    globalShortcut.register('CmdOrCtrl+Alt+K', function () {
        mainWindow.show();
    });
}


export default initGlobalShortcut;