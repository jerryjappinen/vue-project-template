// Copy source launch images into an imageset folder of the Xcode project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-launchimages-ios', function (callback) {
		var platform = 'ios';

		// Fetch assets to copy
		var files = gulp.src(config.source[platform]['launchImages']);

		// Destination path is dynamic
		var destination = config.buildOptions.cordova.paths.root +
			'platforms/' +
			platform + '/' +
			config.meta.title + '/' +
			config.buildOptions.cordova.paths[platform]['launchImages'];

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (launch images for ' + platform + '): '
			})))

			.pipe(gulp.dest(destination));

	});

};
