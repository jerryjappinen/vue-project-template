// Copy app icon assets into native project resource folders
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-coreassets', function (callback) {

		plugins.runSequence(
			[
				'subtask-build-electron-coreassets-svg',
				'subtask-build-electron-coreassets-css',
				'subtask-build-electron-coreassets-js'
			],
			callback
		);

	});

};
