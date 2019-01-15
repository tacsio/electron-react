const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev')

let mainWindow;
let imageWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 900, height: 680, webPreferences: { webSecurity: false}})
    //mainWindow.setMenuBarVisibility(false);
    //mainWindow.webContents.openDevTools();

    imageWindow = new BrowserWindow({width: 600, height: 600, resizable: false, parent: mainWindow, show: false})

    mainWindow.loadURL(
        isDev ? 'http://localhost:3000' :
        url.format({
            pathname: path.join(__dirname, '../build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    imageWindow.loadURL(
        isDev ? 'http://localhost:3000/image' :
        url.format({
            pathname: path.join(__dirname, '../build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    mainWindow.on('closed', () => mainWindow = null);

    imageWindow.on('close', (event) => {
        event.preventDefault();
        imageWindow.hide();
    });
}

app.on('ready', createWindow);

//macOs close
app.on('window-all-closed', ()=> {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

//initialize the app's main window
app.on('activate', ()=> {
    if(mainWindow == null) {
        createWindow();
    }
});

app.on('browser-window-created', (event, window)=> {
  window.setMenuBarVisibility(false);
});

ipcMain.on("toggle-image", (event, arg) => {
    imageWindow.show();
    imageWindow.webContents.send('item', arg)
});
