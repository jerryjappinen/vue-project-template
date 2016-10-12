// Prepare platforms as defined in config
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-init-cordova-platforms', function (callback) {

		// New instance of Cordova targeting our Cordova project directory
		var cordova = new plugins.nodeCordova(config.buildOptions.cordova.paths.root, true);
		var platforms = helpers.getCordovaPlatforms();
		var max = platforms.length;

		// Add each platform defined in config
		if (max) {

			platforms.forEach(function (platform, i, loop) {

				// Install platform
				console.log('Preparing ' + platform + ' platform for Cordova...');
				cordova.addPlatform(platform, function (err) {

					// Log results
					if (err) {
						console.log(err);
					} else {
						console.log(platform + ' installed');
					}

					// Report status
					max--;
					if (max < 1) {
						callback();
					}

				});

			});

		} else {

			console.log('No platforms defined in project manifest');
			callback();

		}

	});

};
