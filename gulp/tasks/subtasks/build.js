// Build everything
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build', function (callback) {

		plugins.runSequence(
			'subtask-build-core',
			[
				'subtask-build-cordova',
				'subtask-build-window'
			],
			callback
		);

	});
};