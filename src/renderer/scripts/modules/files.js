export function setupFileHandlers() {
    const openButton = document.getElementById('open-file');
    const saveButton = document.getElementById('save-file');
    const pathElement = document.getElementById('file-path');

    openButton.addEventListener('click', async () => {
        try {
            const result = await window.electronAPI.openFile();
            pathElement.textContent = result.filePaths.join(', ');
        } catch (error) {
            pathElement.textContent = `Error: ${error.message}`;
            console.error('File Open Error:', error);
        }
    });

    saveButton.addEventListener('click', async () => {
        try {
            const result = await window.electronAPI.saveFile();
            pathElement.textContent = result.filePath;
        } catch (error) {
            pathElement.textContent = `Error: ${error.message}`;
            console.error('File Save Error:', error);
        }
    });
}