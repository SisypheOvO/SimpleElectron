import { app, Menu, Tray, nativeImage } from 'electron';
import path from 'path';
import fs from 'fs';

export class TrayManager {
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
        this.tray = null;
    }

    init() {
        try {
            // 使用正确的路径获取图标
            const iconPath = path.join(app.getAppPath(), 'src', 'renderer', 'assets', 'images', 'icon.png');
            console.log('Loading tray icon from:', iconPath); // 用于调试

            // 检查文件是否存在
            if (!fs.existsSync(iconPath)) {
                console.error('Tray icon not found at:', iconPath);
                return;
            }

            const icon = nativeImage.createFromPath(iconPath);

            this.tray = new Tray(icon);
            this.setTrayMenu();
            this.setTrayEvents();

        } catch (error) {
            console.error('Error initializing tray:', error);
        }
    }

    setTrayMenu() {
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Show App',
                click: () => this.mainWindow.show()
            },
            { type: 'separator' },
            {
                label: 'Quit',
                click: () => {
                    app.isQuitting = true;
                    app.quit();
                }
            }
        ]);

        this.tray.setContextMenu(contextMenu);
        this.tray.setToolTip(app.getName());
    }

    setTrayEvents() {
        this.tray.on('click', () => {
            this.mainWindow.isVisible() ? this.mainWindow.hide() : this.mainWindow.show();
        });
    }

    destroy() {
        if (this.tray) {
            this.tray.destroy();
        }
    }
}