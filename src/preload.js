window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});


// 下面的内容是preload的一个暴露接口

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('SisphusAPI', {
    ConsoleCiallo: () => {
        ipcRenderer.invoke('console-ciallo',114514).then((result) => {
            console.log(result);
        });
    },
    ConsoleCialloWith: (arg) => {
        console.log('Ciallo~', arg);
    },
});
