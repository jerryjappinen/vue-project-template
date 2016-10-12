// Build everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('build', function (callback) {

		plugins.runSequence(
			'subtask-clear-core',
			'subtask-clear-window',
			'subtask-build-core',
			'subtask-build-window',
			callback
		);

	});
};