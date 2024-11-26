import { globalShortcut } from 'electron';

export class ShortcutManager {
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
        this.shortcuts = new Map();
    }

    register(accelerator, callback) {
        try {
            if (this.shortcuts.has(accelerator)) {
                this.unregister(accelerator);
            }

            const success = globalShortcut.register(accelerator, callback);
            if (success) {
                this.shortcuts.set(accelerator, callback);
                return true;
            }
            console.warn(`Failed to register shortcut: ${accelerator}`);
            return false;
        } catch (error) {
            console.error(`Error registering shortcut ${accelerator}:`, error);
            return false;
        }
    }

    unregister(accelerator) {
        try {
            if (this.shortcuts.has(accelerator)) {
                globalShortcut.unregister(accelerator);
                this.shortcuts.delete(accelerator);
            }
        } catch (error) {
            console.error(`Error unregistering shortcut ${accelerator}:`, error);
        }
    }

    init() {
        this.register('CmdOrCtrl+Alt+K', () => {
            if (this.mainWindow) {
                this.mainWindow.show();
            }
        });
    }

    unregisterAll() {
        globalShortcut.unregisterAll();
        this.shortcuts.clear();
    }
}