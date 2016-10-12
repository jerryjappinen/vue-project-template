// Prepare plugins as defined in config
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-init-cordova-plugins', function (callback) {

		// New instance of Cordova targeting our Cordova project directory
		var cordova = new plugins.nodeCordova(config.buildOptions.cordova.paths.root, true);
		var max = config.buildOptions.cordova.plugins.length;

		// Add each plugin defined in config
		if (max) {

			config.buildOptions.cordova.plugins.forEach(function (plugin, i, loop) {

				// Install plugin
				console.log('Preparing ' + plugin + ' plugin for Cordova...');
				cordova.addPlugin(plugin, function (err) {

					// Log results
					// NOTE: Cordova will throw some errors when it apparently copies stuff over more than once
					// if (err) {
					// 	console.log(err);
					// } else {
					// }
						console.log(plugin + ' installed...');

					// Report status
					max--;
					if (max < 1) {
						callback();
					}

				});
			});

		} else {

			console.log('No plugins defined in project manifest');
			callback();

		}

	});

};