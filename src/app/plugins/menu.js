import { app, Menu, shell } from 'electron';
export class MenuManager {
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
        this.dialogManager = null;
    }

    setDialogManager(manager) {
        this.dialogManager = manager;
    }

    init() {
        const template = this.createMenuTemplate();
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

    createMenuTemplate() {
        // 返回一个数组作为菜单模板
        return [
            this.createFileMenu(),
            this.createEditMenu(),
            this.createViewMenu(),
            this.createWindowMenu(),
            this.createHelpMenu()
        ];
    }

    createFileMenu() {
        return {
            label: 'File',
            submenu: [
                {
                    label: 'Open File',
                    accelerator: 'CmdOrCtrl+O',
                    click: async () => {
                        if (this.dialogManager) {
                            await this.dialogManager.showOpenDialog();
                        }
                    }
                },
                {
                    label: 'Save File',
                    accelerator: 'CmdOrCtrl+S',
                    click: async () => {
                        if (this.dialogManager) {
                            await this.dialogManager.showSaveDialog();
                        }
                    }
                },
                {
                    label: 'Message Box',
                    click: async () => {
                        if (this.dialogManager) {
                            await this.dialogManager.showMessageBox({
                                title: 'Offense',
                                message: "Don't click me!",
                                detail: 'This dialog provides nothing'
                            });
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => this.mainWindow.close()
                }
            ]
        };
    }

    createEditMenu() {
        return {
            label: 'Edit',
            submenu: [
                { role: 'undo', accelerator: 'CmdOrCtrl+Z' },
                { role: 'redo', accelerator: 'CmdOrCtrl+Y' },
                { type: 'separator' },
                { role: 'cut', accelerator: 'CmdOrCtrl+X' },
                { role: 'copy', accelerator: 'CmdOrCtrl+C' },
                { role: 'paste', accelerator: 'CmdOrCtrl+V' },
                { role: 'selectAll', accelerator: 'CmdOrCtrl+A' }
            ]
        };
    }

    createViewMenu() {
        return {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: (_, focusedWindow) => {
                        if (focusedWindow) focusedWindow.reload();
                    }
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
                    click: (_, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                        }
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                    click: (_, focusedWindow) => {
                        if (focusedWindow) {
                            focusedWindow.webContents.toggleDevTools();
                        }
                    }
                }
            ]
        };
    }

    createWindowMenu() {
        return {
            label: 'Window',
            role: 'window',
            submenu: [
                { role: 'minimize', accelerator: 'CmdOrCtrl+M' },
                { role: 'close', accelerator: 'CmdOrCtrl+W' }
            ]
        };
    }

    createHelpMenu() {
        return {
            label: 'Help',
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: () => shell.openExternal('http://electron.atom.io')
                }
            ]
        };
    }

    createMacMenu() {
        return {
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        };
    }
}