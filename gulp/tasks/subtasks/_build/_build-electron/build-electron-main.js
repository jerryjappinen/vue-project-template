// Copy compiled core assets into target folder in a format that makes sense
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-main', function (callback) {

		plugins.runSequence(
			[
				'subtask-build-electron-main-init',
				'subtask-build-electron-main-template'
			],
			callback
		);

	});
};
