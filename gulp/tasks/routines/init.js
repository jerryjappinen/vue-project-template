// Build everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('init', function (callback) {

		plugins.runSequence(
			'subtask-clear',
			'subtask-uninit',
			'subtask-init',
			callback
		);

	});
};