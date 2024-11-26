export function setupVersionInfo() {
    const versions = window.electronAPI.versions;
    document.getElementById('chrome-version').textContent = versions.chrome;
    document.getElementById('node-version').textContent = versions.node;
    document.getElementById('electron-version').textContent = versions.electron;
}