const { createMainWindow } = require('./mainWindow');
const { initMenu } = require('./menu');
const { initTray } = require('./tray');
const { initClipboard } = require('./clipboard');
const { initGlobalShortcut } = require('./globalShortcut');
const { openDialog, saveDialog, messageBox } = require('./dialog');

function initialization(mainWin) {     
        initMenu(mainWin);
        initTray(mainWin);
        initClipboard();
        initGlobalShortcut(mainWin);
        openDialog();
        saveDialog();
        messageBox();
}

module.exports = {
    initialization
};