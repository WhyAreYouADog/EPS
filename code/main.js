const { app, BrowserWindow } = require('electron')

function createWindow(){
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: ('preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    
    win.loadFile('./src/index.html')
}

app.whenReady().then(()=>{
    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })