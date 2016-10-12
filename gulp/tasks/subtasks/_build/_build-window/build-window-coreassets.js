// Copy compiled core assets into target folder in a format that makes sense
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-window-coreassets', function (callback) {

		plugins.runSequence(
			[
				'subtask-build-window-coreassets-svg',
				'subtask-build-window-coreassets-css',
				'subtask-build-window-coreassets-js'
			],
			callback
		);

	});
};