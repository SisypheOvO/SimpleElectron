import { clipboard } from 'electron';
export class ClipboardManager {
    constructor() {
        this.history = [];
        this.maxHistorySize = 10;
    }

    write(text) {
        try {
            clipboard.writeText(text);
            this.addToHistory(text);
            return true;
        } catch (error) {
            console.error('Error writing to clipboard:', error);
            return false;
        }
    }

    read() {
        try {
            return clipboard.readText();
        } catch (error) {
            console.error('Error reading from clipboard:', error);
            return '';
        }
    }

    addToHistory(text) {
        this.history.unshift(text);
        if (this.history.length > this.maxHistorySize) {
            this.history.pop();
        }
    }

    getHistory() {
        return [...this.history];
    }

    clearHistory() {
        this.history = [];
    }
}