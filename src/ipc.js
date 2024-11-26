import { ipcMain, dialog, clipboard } from 'electron';

export class IPCManager {
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
        this.handlers = [
            'dialog:openFile',
            'dialog:saveFile',
            'clipboard:copy',
            'clipboard:read'
        ];
    }

    init() {
        this.setupDialogHandlers();
        this.setupClipboardHandlers();
    }

    setupDialogHandlers() {
        // 文件对话框处理程序
        ipcMain.handle('dialog:openFile', async () => {
            const result = await dialog.showOpenDialog(this.mainWindow, {
                properties: ['openFile', 'multiSelections'],
                filters: [
                    { name: 'All Files', extensions: ['*'] }
                ]
            });
            return result;
        });

        ipcMain.handle('dialog:saveFile', async () => {
            const result = await dialog.showSaveDialog(this.mainWindow, {
                filters: [
                    { name: 'All Files', extensions: ['*'] }
                ]
            });
            return result;
        });
    }

    setupClipboardHandlers() {
        // 剪贴板处理程序
        ipcMain.handle('clipboard:copy', (event, text) => {
            clipboard.writeText(text);
            return true;
        });

        ipcMain.handle('clipboard:read', () => {
            return clipboard.readText();
        });
    }

    // 清理方法
    cleanup() {
        // 移除所有处理程序
        this.handlers.forEach(channel => {
            try {
                ipcMain.removeHandler(channel);
            } catch (error) {
                console.log(`No handler found for ${channel}`);
            }
        });
    }
}