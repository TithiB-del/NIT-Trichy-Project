const {
    app,
    BrowserWindow
} = require('electron');



const createWindow = () => {
    const win = new BrowserWindow({
        height: 2000,
        width:2000
    })

    win.loadFile('./static/index.html');
}


app.whenReady()
.then(() => {
    createWindow();
})