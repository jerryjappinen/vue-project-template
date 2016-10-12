// Android love
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-init-cordova-gradle', function (callback) {

		// Set up each gradle parameter
		var lines = [];
		if (config.buildOptions.cordova.gradle) {
			for (var key in config.buildOptions.cordova.gradle) {
				var value = '' + config.buildOptions.cordova.gradle[key];
				if (value.length) {
					lines.push(key + '=' + value);
				}
			}
		}

		// We have options
		if (lines.length) {
			var destination = config.buildOptions.cordova.paths.root + 'platforms/android/';
			var targetFileName = 'gradle.properties';
			var output = lines.join('\n');

			return helpers.streamFromString(targetFileName, output)
				.pipe(plugins.plumber())
				.pipe(gulp.dest(destination));

		} else {
			return callback();
		}

	});

};
