// Watch all
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('watch-cordova', function (callback) {

		plugins.runSequence(
			'subtask-clear-core',
			'subtask-clear-cordova',
			'subtask-build-core',
			'subtask-build-cordova',
			[
				'subtask-watch-project-config',
				'subtask-watch-core',
				'subtask-watch-cordova'
			],
			callback
		);

	});
};
