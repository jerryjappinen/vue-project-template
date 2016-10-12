// Copy Android static assets into Android project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-appicons-android', function (callback) {
		var platform = 'android';

		// Assets to copy
		var files = gulp.src(config.source[platform]['res'] + '**/*', {
			base: config.source[platform]['res']
		});

		// Destination path is dynamic
		var destination = config.buildOptions.cordova.paths.root +
			'platforms/' +
			platform + '/' +
			config.buildOptions.cordova.paths[platform]['res'];

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (static assets (res) for ' + platform + '): '
			})))

			.pipe(gulp.dest(destination));

	});

};
