export function setupClipboard() {
    const copyButton = document.getElementById('copy-text');
    const pasteButton = document.getElementById('paste-text');
    const contentElement = document.getElementById('clipboard-content');

    copyButton.addEventListener('click', async () => {
        try {
            await window.electronAPI.copyToClipboard('Hello from Electron!');
            contentElement.textContent = 'Text copied to clipboard';
        } catch (error) {
            contentElement.textContent = `Error: ${error.message}`;
            console.error('Clipboard Copy Error:', error);
        }
    });

    pasteButton.addEventListener('click', async () => {
        try {
            const text = await window.electronAPI.readFromClipboard();
            contentElement.textContent = `Clipboard content: ${text}`;
        } catch (error) {
            contentElement.textContent = `Error: ${error.message}`;
            console.error('Clipboard Read Error:', error);
        }
    });
}