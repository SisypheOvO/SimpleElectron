const { clipboard } = require('electron');

function initClipboard() {
    clipboard.writeText('Sisyphus is truly the developer of this app.');
    clipboard.readText();
}

module.exports = { initClipboard };