const { dialog } = require('electron');

function openDialog() {
    dialog.showOpenDialog({
        title: 'Open File',
        defaultPath: '.',
        buttonLabel: 'Open',
        filters: [ {
                name: 'All Files',
                extensions: ['*']
            } ],
        properties: ['openFile', 'openDirectory', 'multiSelections']
    }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
    }).catch(err => {
        console.log('Error during showOpenDialog:',err)
    });
}

function saveDialog() {
    dialog.showSaveDialog({
        title: 'Save File',
        defaultPath: '.',
        buttonLabel: 'Save',
        filters: [ {
                name: 'All Files',
                extensions: ['*']
            } ],
    }).then(result => {
        console.log(result.canceled)
        console.log(result.filePath)
    }).catch(err => {
        console.log('Error during showSaveDialog:',err)
    });
}

function messageBox() {
    dialog.showMessageBox({
        type: 'info',
        title: 'Information',
        message: 'This is an information dialog',
        detail: 'This dialog provides information',
        buttons: ['OK']
    }).then(result => {
        console.log(result)
    }).catch(err => {
        console.log('Error during showMessageBox:',err)
    });
}



module.exports = {
    openDialog,
    saveDialog,
    messageBox
};