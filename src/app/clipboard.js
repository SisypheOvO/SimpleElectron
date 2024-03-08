import { clipboard } from 'electron';

function initClipboard() {
    clipboard.writeText('Sisyphus is truly the developer of this app.');
    clipboard.readText();
}

export default initClipboard;