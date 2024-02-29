const { app, Menu, Tray } = require('electron');

function initTray(mainWin) {
    let trayMenu = Menu.buildFromTemplate([
        {
            label: 'Show App',
            click: function () {
                mainWindow.show()
            }
        },
        {
            label: 'Quit',
            click: function () {
                app.isQuiting = true
                app.quit()
            }
        }
    ]);
    const appIcon = new Tray('./src/renderer/icon.png');
    appIcon.setContextMenu(trayMenu);
    appIcon.setToolTip('My Electron App');
    appIcon.on('click', function () {
        mainWin.show();
    });
};

module.exports = { initTray };