// Copy splash screen assets into native project resource folders
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-launchimages', function (callback) {

		// FLAG: should use helpers.getCordovaPlatforms() and check what's needed

		plugins.runSequence(
			'subtask-build-cordova-launchimages-ios',
			callback
		);

	});

};
