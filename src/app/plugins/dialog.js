import { dialog } from 'electron';

export class DialogManager {
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
    }

    async showOpenDialog(options = {}) {
        try {
            const defaultOptions = {
                title: 'Open File',
                defaultPath: '.',
                buttonLabel: 'Open',
                filters: [{ name: 'All Files', extensions: ['*'] }],
                properties: ['openFile', 'openDirectory', 'multiSelections']
            };

            const result = await dialog.showOpenDialog(
                this.mainWindow,
                { ...defaultOptions, ...options }
            );

            console.log('Open dialog result:', result);
            return result;
        } catch (error) {
            console.error('Error in openDialog:', error);
            throw error;
        }
    }

    async showSaveDialog(options = {}) {
        try {
            const defaultOptions = {
                title: 'Save File',
                defaultPath: '.',
                buttonLabel: 'Save',
                filters: [{ name: 'All Files', extensions: ['*'] }]
            };

            const result = await dialog.showSaveDialog(
                this.mainWindow,
                { ...defaultOptions, ...options }
            );

            console.log('Save dialog result:', result);
            return result;
        } catch (error) {
            console.error('Error in saveDialog:', error);
            throw error;
        }
    }

    async showMessageBox(options = {}) {
        try {
            const defaultOptions = {
                type: 'info',
                title: 'Message',
                message: 'Info',
                detail: 'Additional information',
                buttons: ['OK']
            };

            const result = await dialog.showMessageBox(
                this.mainWindow,
                { ...defaultOptions, ...options }
            );

            console.log('Message box result:', result);
            return result;
        } catch (error) {
            console.error('Error in messageBox:', error);
            throw error;
        }
    }

    async showErrorBox(title, content) {
        try {
            dialog.showErrorBox(title, content);
        } catch (error) {
            console.error('Error showing error box:', error);
            throw error;
        }
    }
}