import { app, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import initialization from './app/initialization.js';
import createMainWindow from './app/mainWindow.js';

app.whenReady().then(function () {
    try {

        let mainWin = createMainWindow();
        ipcMain.handle('console-ciallo', (event, arg) => {
            console.log('Ciallo~', arg);
            mainWin.webContents.openDevTools();
            return 1919810;
        });

        initialization(mainWin);

    } catch (error) {
        console.error('Error during app initialization:', error);
    }
});

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


// function createMainWindow () {
    
//     let mainWindow = new BrowserWindow({
//         width: 800, 
//         height: 600,
//         frame: true,
//         autoHideMenuBar: false,
//         show: false,
//         webPreferences: {
//             // nodeIntegration: true,
//             // contextIsolation: false,
//             preload: path.join(__dirname, 'preload.js')
//         }
//     });

//     mainWindow.loadFile(path.join(__dirname, '/renderer/renderer.html'));

//     mainWindow.on('close', function (event) {
//         if (!app.isQuiting) {
//             event.preventDefault();
//             mainWindow.hide();
//         }
//         return false;
//     });

//     globalShortcut.register('CmdOrCtrl+Alt+K', function () {
//         mainWindow.show();
//     });

//     mainWindow.once('ready-to-show', () => {
//         mainWindow.show();
//     });

//     mainWindow.on('closed', function () {
//         mainWindow = null;
//     });

//     return mainWindow;
// };

// function setupMenu(){
//     let template = [
//     {
//         label: 'File',
//         submenu: [
//             {
//                 label: 'Open File',
//                 accelerator: 'CmdOrCtrl+O',
//                 click() {
//                     dialog.showOpenDialog({
//                         title: 'Open File',
//                         defaultPath: '.',
//                         buttonLabel: 'Open',
//                         filters: [ {
//                                 name: 'All Files',
//                                 extensions: ['*']
//                             } ],
//                         properties: ['openFile', 'openDirectory', 'multiSelections']
//                     }).then(result => {
//                         console.log(result.canceled)
//                         console.log(result.filePaths)
//                     }).catch(err => {
//                         console.log('Error during showOpenDialog:',err)
//                     });
//                 }
//             },
//             {
//                 label: 'Save File',
//                 accelerator: 'CmdOrCtrl+S',
//                 click() {
//                     dialog.showSaveDialog({
//                         title: 'Save File',
//                         defaultPath: '.',
//                         buttonLabel: 'Save',
//                         filters: [ {
//                                 name: 'All Files',
//                                 extensions: ['*']
//                             } ],
//                     }).then(result => {
//                         console.log(result.canceled)
//                         console.log(result.filePath)
//                     }).catch(err => {
//                         console.log('Error during showSaveDialog:',err)
//                     });
//                 }
//             },
//             {
//                 label: 'Message Box',
//                 click() {
//                     dialog.showMessageBox({
//                         type: 'info',
//                         title: 'Offense',
//                         message: 'Dont click me!',
//                         detail: 'This dialog provides nothing',
//                         buttons: ['OK']
//                     }).then(result => {
//                         console.log(result)
//                     }).catch(err => {
//                         console.log('Error during showMessageBox:',err)
//                     });
//                 }
//             },
//             {
//                 type: 'separator'
//             },
//             {
//                 label: 'Exit',
//                 accelerator: 'CmdOrCtrl+Q',
//                 click() {
//                     app.quit();
//                 }
//             } 
//         ]
//     },
//     {
//         label: 'Edit',
//         submenu: [
//             {
//                 label: 'Undo',
//                 accelerator: 'CmdOrCtrl+Z',
//                 role: 'undo'
//             },
//             {
//                 label: 'Redo',
//                 accelerator: 'CmdOrCtrl+Y',
//                 role: 'redo'
//             },
//             {
//                 type: 'separator'
//             },
//             {
//                 label: 'Cut',
//                 accelerator: 'CmdOrCtrl+X',
//                 role: 'cut'
//             },
//             {
//                 label: 'Copy',
//                 accelerator: 'CmdOrCtrl+C',
//                 role: 'copy'
//             },
//             {
//                 label: 'Paste',
//                 accelerator: 'CmdOrCtrl+V',
//                 role: 'paste'
//             },
//             {
//                 label: 'Select All',
//                 accelerator: 'CmdOrCtrl+A',
//                 role: 'selectall'
//             }
//         ]
//     },
//     {
//         label: 'View',
//         submenu: [
//             {
//                 label: 'Reload',
//                 accelerator: 'CmdOrCtrl+R',
//                 click(item, focusedWindow) {
//                     if (focusedWindow) focusedWindow.reload();
//                 }
//             },
//             {
//                 label: 'Toggle Full Screen',
//                 accelerator: (function() {
//                     if (process.platform === 'darwin') {
//                         return 'Ctrl+Command+F';
//                     } else {
//                         return 'F11';
//                     }
//                 })(),
//                 click(item, focusedWindow) {
//                     if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
//                 }
//             },
//             {
//                 label: 'Toggle Developer Tools',
//                 accelerator: (function() {
//                     if (process.platform === 'darwin') {
//                         return 'Alt+Command+I';
//                     } else {
//                         return 'Ctrl+Shift+I';
//                     }
//                 })(),
//                 click(item, focusedWindow) {
//                     if (focusedWindow) focusedWindow.webContents.toggleDevTools();
//                 }
//             }
//         ]
//     },
//     {
//         label: 'Window',
//         role: 'window',
//         submenu: [
//             {
//                 label: 'Minimize',
//                 accelerator: 'CmdOrCtrl+M',
//                 role: 'minimize'
//             },
//             {
//                 label: 'Close',
//                 accelerator: 'CmdOrCtrl+W',
//                 role: 'close'
//             }
//         ]
//     },
//     {
//         label: 'Help',
//         role: 'help',
//         submenu: [
//             {
//                 label: 'Learn More',
//                 click() { require('electron').shell.openExternal('http://electron.atom.io'); }
//             }]
//     }
//     ];
//     const menu = Menu.buildFromTemplate(template);
//     Menu.setApplicationMenu(menu);
// };

// function setupTray(mainWin) {
//     let trayMenu = Menu.buildFromTemplate([
//         {
//             label: 'Show App',
//             click: function () {
//                 mainWindow.show()
//             }
//         },
//         {
//             label: 'Quit',
//             click: function () {
//                 app.isQuiting = true
//                 app.quit()
//             }
//         }
//     ]);
//     const appIcon = new Tray(path.join(__dirname,'/renderer/icon.png'));
//     appIcon.setContextMenu(trayMenu);
//     appIcon.setToolTip('My Electron App');
//     appIcon.on('click', function () {
//         mainWin.show();
//     });
// };

// function dialogIntergration() {
//     dialog.showOpenDialog({
//         title: 'Open File',
//         defaultPath: '.',
//         buttonLabel: 'Open',
//         filters: [ {
//                 name: 'All Files',
//                 extensions: ['*']
//             } ],
//         properties: ['openFile', 'openDirectory', 'multiSelections']
//     }).then(result => {
//         console.log(result.canceled)
//         console.log(result.filePaths)
//     }).catch(err => {
//         console.log('Error during showOpenDialog:',err)
//     });

//     dialog.showSaveDialog({
//         title: 'Save File',
//         defaultPath: '.',
//         buttonLabel: 'Save',
//         filters: [ {
//                 name: 'All Files',
//                 extensions: ['*']
//             } ],
//     }).then(result => {
//         console.log(result.canceled)
//         console.log(result.filePath)
//     }).catch(err => {
//         console.log('Error during showSaveDialog:',err)
//     });

//     dialog.showMessageBox({
//         type: 'info',
//         title: 'Information',
//         message: 'This is an information dialog',
//         detail: 'This dialog provides information',
//         buttons: ['OK']
//     }).then(result => {
//         console.log(result)
//     }).catch(err => {
//         console.log('Error during showMessageBox:',err)
//     });
// }