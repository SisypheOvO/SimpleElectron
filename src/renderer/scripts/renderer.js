import { setupClipboard, setupVersionInfo, setupFileHandlers } from './modules/index.js';

// 初始化所有功能模块
document.addEventListener('DOMContentLoaded', () => {
    // 挂载所有从主进程传递过来的API的监听器
    setupVersionInfo();
    setupFileHandlers();
    setupClipboard();
    console.log('Renderer process initialized');
});