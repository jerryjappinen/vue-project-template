// Build everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('init-cordova', function (callback) {

		plugins.runSequence(
			'subtask-clear-cordova',
			'subtask-uninit-cordova',
			'subtask-init-cordova',
			callback
		);

	});
};