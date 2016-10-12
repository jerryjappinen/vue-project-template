// Copy app icon sets into an imageset folder of the Xcode project
// FIXME: this could support resizing just as well
// FIXME: the file names need to be correct in the source, this does not ensure correct output
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-appicons-osx', function (callback) {
		var platform = 'osx';

		// Assets to copy
		var files = gulp.src(config.source[platform]['appIcons']);

		// Destination path is dynamic
		var destination = config.buildOptions.cordova.paths.root +
			'platforms/' +
			platform + '/' +
			config.meta.title + '/' +
			config.buildOptions.cordova.paths[platform]['appIcons'];

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (app icons for ' + platform + '): '
			})))

			.pipe(gulp.dest(destination));

	});

};
