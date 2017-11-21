const {app, BrowserWindow, ipcMain, Menu} = require('electron');
const path = require('path');
const url = require('url');
const {knex} = require('knex');

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1240,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        }
    })


    mainWindow.loadURL('http://localhost:3000');
    mainWindow
        .webContents
        .openDevTools();

    mainWindow.webContents.send('halt', "halt");

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

}
app.on('ready', createWindow);

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on("mainWindowLoaded", function () {
    console.log("pass!");
})
ipcMain.on('pong', () => {
    console.log('pong is here');
    mainWindow.webContents.send('ping');
})