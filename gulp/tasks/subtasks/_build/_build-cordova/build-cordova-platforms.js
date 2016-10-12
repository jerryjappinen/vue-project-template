// Copy compiled core assets into target folder in a format that makes sense
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-platforms', function (callback) {

		plugins.runSequence(
			'subtask-build-cordova-platforms-emulator',
			'subtask-build-cordova-platforms-device',
			callback
		);

	});

};
