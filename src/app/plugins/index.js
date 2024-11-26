import { MenuManager } from './menu.js';
import { TrayManager } from './tray.js';
import { ShortcutManager } from './shortcuts.js';
import { ClipboardManager } from './clipboard.js';
import { DialogManager } from "./dialog.js";

export async function initializeApp(mainWindow) {
  try {
    const menuManager = new MenuManager(mainWindow);
    const trayManager = new TrayManager(mainWindow);
    const shortcutManager = new ShortcutManager(mainWindow);
    const clipboardManager = new ClipboardManager();
    const dialogManager = new DialogManager(mainWindow);

    // 启动需要初始化的管理器
    await menuManager.init();
    await trayManager.init();
    await shortcutManager.init();

    // 设置默认剪贴板内容
    clipboardManager.write('Sisyphus here.');

    // 设置菜单项的对话框操作
    menuManager.setDialogManager(dialogManager);

    // 返回所有管理器实例
    return {
      menuManager,
      trayManager,
      shortcutManager,
      clipboardManager,
      dialogManager,
      cleanup: () => {
        shortcutManager.unregisterAll();
        trayManager.destroy();
        clipboardManager.clearHistory();
      }
    };
  } catch (error) {
    console.error("Initialization error:", error);
    throw error;
  }
}
