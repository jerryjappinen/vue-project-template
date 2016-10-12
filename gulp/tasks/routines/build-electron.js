// Build everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('build-electron', function (callback) {

		plugins.runSequence(
			'subtask-clear-core',
			'subtask-clear-electron',
			'subtask-build-core',
			'subtask-build-electron',
			callback
		);

	});
};
