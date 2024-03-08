import { app, Menu, dialog } from 'electron';

function initMenu(){
    let template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open File',
                accelerator: 'CmdOrCtrl+O',
                click() {
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
                        console.log('Error during showOpenDialog:',err)
                    });
                }
            },
            {
                label: 'Save File',
                accelerator: 'CmdOrCtrl+S',
                click() {
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
                        console.log('Error during showSaveDialog:',err)
                    });
                }
            },
            {
                label: 'Message Box',
                click() {
                    dialog.showMessageBox({
                        type: 'info',
                        title: 'Offense',
                        message: 'Dont click me!',
                        detail: 'This dialog provides nothing',
                        buttons: ['OK']
                    }).then(result => {
                        console.log(result)
                    }).catch(err => {
                        console.log('Error during showMessageBox:',err)
                    });
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
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

export default initMenu ;