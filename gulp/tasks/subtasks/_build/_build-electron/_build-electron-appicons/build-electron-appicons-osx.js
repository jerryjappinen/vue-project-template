// Copy app icon PNGs into an ICNS
// NOTE: uses the same app icons as cordova source
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-appicons-osx', function (callback) {
		var platform = 'osx';

		// Assets to copy
		var files = gulp.src(config.source[platform]['appIconFile']);
		var destination = config.targets['electron'];

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (app icon for ' + platform + '): '
			})))

			// Name of outputted file
			.pipe(plugins.rename('icon.icns'))

			.pipe(gulp.dest(destination));

	});

};
