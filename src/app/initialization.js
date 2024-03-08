// import { createMainWindow } from './mainWindow' ;
import  initMenu  from './Menu.js' ;
import  initTray  from './Tray.js' ;
import  initClipboard  from './clipboard.js' ;
import  initGlobalShortcut  from './globalShortcut.js' ;
// import  openDialog  from './dialog.js' ;
// import  saveDialog  from './dialog.js' ;
// import  messageBox  from './dialog.js' ;
import dialogFuncs from './dialog.js' ;

function initialization(mainWin) {   
        initMenu();
        initTray(mainWin);
        initClipboard();
        initGlobalShortcut(mainWin);
        dialogFuncs.openDialog();
        dialogFuncs.saveDialog();
        dialogFuncs.messageBox();
}

export default initialization ;