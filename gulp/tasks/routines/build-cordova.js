// Build everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('build-cordova', function (callback) {

		plugins.runSequence(
			'subtask-clear-core',
			'subtask-clear-cordova',
			'subtask-build-core',
			'subtask-build-cordova',
			callback
		);

	});
};