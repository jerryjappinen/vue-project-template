// Clean up everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-clear', function (callback) {

		plugins.runSequence(
			[
				'subtask-clear-core',
				'subtask-clear-cordova',
				'subtask-clear-window'
			],
			callback
		);

	});
};