
{% autoescape false %}

	var electron = require('electron');

	// Keep a global reference of the window object, if you don't, the window will
	// be closed automatically when the JavaScript object is garbage collected.
	var win;

	var createWindow = function () {

		// Create the browser window.
		win = new electron.BrowserWindow({
			width: {{ clientConfig.defaultWindowWidth }},
			height: {{ clientConfig.defaultWindowHeight }}
		});

		// Load the main template of the app in the window we just created.
		win.loadURL('file://' + __dirname + '/' + 'index.html');

		{% if debug %}

			// Open the DevTools.
			win.webContents.openDevTools();

		{% endif %}

		// Emitted when the window is closed.
		win.on('closed', function () {

			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			win = null;

		});

	};

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	electron.app.on('ready', createWindow);

	// Quit when all windows are closed.
	electron.app.on('window-all-closed', function () {

		// On macOS it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			electron.app.quit();
		}

	});

	electron.app.on('activate', function () {

		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (win === null) {
			createWindow();
		}

	});

	// In this file you can include the rest of your app's specific main process
	// code. You can also put them in separate files and require them here.

{% endautoescape %}
