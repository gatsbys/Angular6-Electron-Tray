const { app, BrowserWindow, globalShortcut } = require('electron')

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff',
        frame: false,
        icon: `file://${__dirname}/dist/assets/logo.png`
    })

    win.setMenu(null);
    win.setMovable(true)
    win.loadURL(`file://${__dirname}/dist/angular6-electron-tray/index.html`)

    // Event when the window is closed.
    win.on('closed', function () {
        win = null
    })
}

function addShortcut() {
    globalShortcut.register('CommandOrControl+D', () => {
        console.log("windows is visible : " + win.isVisible())
        if (win.isVisible()) {
            win.hide();
        }else{
            win.show();
            win.focus();
        }
})
}
// Create window on electron intialization
app.on('ready', () => {
    createWindow();
    addShortcut();
})

app.on('will-quit', () => {
    // Unregister a shortcut.
    globalShortcut.unregister('CommandOrControl+X')

    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})