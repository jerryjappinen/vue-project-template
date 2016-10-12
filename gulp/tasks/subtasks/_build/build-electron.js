// Build www for mobile version of the project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron', function (callback) {

		plugins.runSequence(
			[
				'subtask-build-electron-coreassets',
				'subtask-build-electron-appicons',
				'subtask-build-electron-manifest',
				'subtask-build-electron-main',
				'subtask-build-electron-public',
			],
			'subtask-build-electron-bundle',
			callback
		);

	});
};
