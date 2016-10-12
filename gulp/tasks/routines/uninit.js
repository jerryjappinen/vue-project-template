// Really prune everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('uninit', function (callback) {

		plugins.runSequence(
			'subtask-clear',
			'subtask-uninit',
			callback
		);

	});
};