// Really prune everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('uninit-cordova', function (callback) {

		plugins.runSequence(
			'subtask-clear-cordova',
			'subtask-uninit-cordova',
			callback
		);

	});
};