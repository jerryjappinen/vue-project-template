// Build and watch all
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('watch', function (callback) {

		plugins.runSequence(
			'subtask-clear-core',
			'subtask-clear-window',
			'subtask-build-core',
			'subtask-build-window',
			[
				'subtask-watch-project-config',
				'subtask-watch-core',
				'subtask-watch-window'
			],
			callback
		);

	});
};
