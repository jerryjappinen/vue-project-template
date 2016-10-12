// Prepare copying Cordova www over to each platform build
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-platforms-device', function (callback) {

		// New instance of Cordova targeting our Cordova project directory
		var cordova = new plugins.nodeCordova(config.buildOptions.cordova.paths.root, true);
		var platforms = helpers.getCordovaPlatforms();
		var max = platforms.length;

		// Add each platform defined in config
		if (max) {

			platforms.forEach(function (platform, i, loop) {

				// Run Cordova's preparation
				console.log('Building ' + platform + ' for device...');
				cordova.buildDevice(platform, function (err) {

					// Log results
					if (err) {
						console.log(err);
					} else {
						console.log(platform + ' ready for build');
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
