const { app, BrowserWindow, Menu, Tray, dialog, globalShortcut, ipcMain } = require('electron');
const path = require('path');

// 监听渲染进程的消息
ipcMain.on('request-main-process-action', (event, arg1, arg2) => {
    // 执行主进程的操作
    const result = performMainProcessAction(arg1, arg2);

    // 将结果发送给渲染进程
    event.reply('response-main-process-action', result);
});

// 实际执行的主进程操作
function performMainProcessAction(arg1, arg2) {
    // 执行主进程操作，返回结果
    return 'Main process action result';
}



let mainWindow;

let template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open File',
                accelerator: 'CmdOrCtrl+O',
                click() {
                    console.log('Open File');
                }
            },
            {
                label: 'Save File',
                accelerator: 'CmdOrCtrl+S',
                click() {
                    console.log('Save File');
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Exit',
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: 'Redo',
                accelerator: 'CmdOrCtrl+Y',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload();
                }
            },
            {
                label: 'Toggle Full Screen',
                accelerator: (function() {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F';
                    } else {
                        return 'F11';
                    }
                })(),
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: (function() {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I';
                    } else {
                        return 'Ctrl+Shift+I';
                    }
                })(),
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                }
            }
        ]
    },
    {
        label: 'Window',
        role: 'window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }
        ]
    },
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternal('http://electron.atom.io'); }
            }]
    }
];

function setupMenu() {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
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
}


app.whenReady().then(function () {
    try {
        createMainWindow();
        const appIcon = new Tray(path.join(__dirname, 'icon.png'));
        appIcon.setContextMenu(trayMenu);
        appIcon.setToolTip('My Electron App');
        appIcon.on('click', function () {
            mainWindow.show();
        });

        mainWindow.on('close', function (event) {
            if (!app.isQuiting) {
                event.preventDefault();
                mainWindow.hide();
            }
            return false;
        });

        globalShortcut.register('CmdOrCtrl+Alt+K', function () {
            mainWindow.show();
        });

    } catch (error) {
        console.error('Error during app initialization:', error);
    }
});


dialog.showOpenDialog({
    title: 'Open File',
    defaultPath: '.',
    buttonLabel: 'Open',
    filters: [ {
            name: 'All Files',
            extensions: ['*']
        } ],
    properties: ['openFile', 'openDirectory', 'multiSelections']
}).then(result => {
    console.log(result.canceled)
    console.log(result.filePaths)
}).catch(err => {
    console.log(err)
});

dialog.showSaveDialog({
    title: 'Save File',
    defaultPath: '.',
    buttonLabel: 'Save',
    filters: [ {
            name: 'All Files',
            extensions: ['*']
        } ],
}).then(result => {
    console.log(result.canceled)
    console.log(result.filePath)
}).catch(err => {
    console.log(err)
});

dialog.showMessageBox({
    type: 'info',
    title: 'Information',
    message: 'This is an information dialog',
    detail: 'This dialog provides information',
    buttons: ['OK']
}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err)
});


function createMainWindow () {
  mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        frame: true,
        autoHideMenuBar: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });
  mainWindow.loadFile('renderer.html');
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}


app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', function () {
    globalShortcut.unregisterAll();
});