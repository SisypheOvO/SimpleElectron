const { globalShortcut } = require('electron');
const mainWindow = require('./mainWindow');

function initGlobalShortcut(mainWindow) {
    globalShortcut.register('CmdOrCtrl+Alt+K', function () {
        mainWindow.show();
    });
}


module.exports = { initGlobalShortcut };