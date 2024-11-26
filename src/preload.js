const { contextBridge, ipcRenderer } = require('electron');

// 向渲染进程暴露安全的API
contextBridge.exposeInMainWorld('electronAPI', {
    // 版本信息
    versions: {
        chrome: process.versions.chrome,
        node: process.versions.node,
        electron: process.versions.electron
    },

    // 文件对话框
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    saveFile: () => ipcRenderer.invoke('dialog:saveFile'),

    // 剪贴板
    copyToClipboard: (text) => ipcRenderer.invoke('clipboard:copy', text),
    readFromClipboard: () => ipcRenderer.invoke('clipboard:read'),
});
