// Modules to control application life and create native browser window
const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

function createWindow() {
	// Create the browser window
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		movable: false,
		offscreen: true,
		icon: path.join(__dirname, 'images', 'icon.png'),
		webPreferences: {
			preload: path.join(__dirname, 'js', 'preload.js')
		}
	});

	// Maximize the window and block resizing
	win.maximize();
	win.setResizable(false);

	// Write scene game (day, night, pool, roof) and level to a file 
	ipcMain.on('writeLevel', (scene, lvl) => {
		let game = scene + '-' + lvl;
		fs.writeFile(path.join('data', 'game'), game, (err) => {
			if (err) {
				console.log(err);
				return;
			}
		});
	});

	// Load the index.html of the app
	win.loadFile('index.html');

	// Open DevTools
	win.webContents.openDevTools();

	// Set frame rate
	win.webContents.setFrameRate(60);
}


Menu.setApplicationMenu(null);


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

	// Read scene game and level from a file to return it to render
	ipcMain.handle('readLevel', () => {
		fs.readFile(path.join('data', 'game'), (err, data) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log("From main p: ", data);
		});
	});

	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
    	// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
