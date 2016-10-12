// Build a browser version of the project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-window', function (callback) {

		plugins.runSequence(
			[
				'subtask-build-window-coreassets',
				'subtask-build-window-main',
				'subtask-build-window-public'
			],
			'subtask-build-window-manifests',
			callback
		);

	});
};
