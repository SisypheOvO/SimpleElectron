// 开发环境启用热重载
if (process.env.NODE_ENV === 'development') {
    try {
        // 注意：import() 必须在顶层使用
        import('electron-reloader').then(module => {
            module.default(module, {
                debug: true,
                watchRenderer: true,  // 同时监视渲染进程文件
                ignore: [
                    'node_modules/**/*',
                    'src/renderer/**/*', // 如果使用其他方式监视渲染进程
                    '*.json'
                ]
            });
        });
    } catch (err) {
        console.log('Error setting up hot reload:', err);
    }
}

import { app, BrowserWindow } from 'electron';
import { initializeApp } from './app/plugins/index.js';
import { createMainWindow } from './app/mainWindow.js';
import { IPCManager } from './ipc.js';

class ElectronApp {
    constructor() {
        this.mainWindow = null;
        this.managers = null;
        this.isQuitting = false;
        this.ipcManager = null;
    }

    async init() {
        try {
            await app.whenReady();
            this.mainWindow = createMainWindow();
            // 初始化 IPC 管理器
            this.ipcManager = new IPCManager(this.mainWindow);
            this.ipcManager.init();

            // 初始化应用程序
            this.managers = await initializeApp(this.mainWindow);
            this.setupAppEvents();

            this.managers.dialogManager.showMessageBox({
                type: 'info',
                title: 'Welcome',
                message: 'Application started successfully!'
            });
        } catch (error) {
            console.error('Error during app initialization:', error);
            app.quit();
        }
    }

    setupAppEvents() {
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                this.mainWindow = createMainWindow();
            }
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('before-quit', () => {
            this.isQuitting = true;
        });
    }
}

const electronApp = new ElectronApp();
electronApp.init();