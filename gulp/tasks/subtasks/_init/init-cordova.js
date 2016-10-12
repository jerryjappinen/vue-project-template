// Initialize cordova project on all platforms
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-init-cordova', function (callback) {

		plugins.runSequence(
			'subtask-init-cordova-project',
			'subtask-init-cordova-platforms',
			'subtask-init-cordova-plugins',
			'subtask-init-cordova-gradle',
			callback
		);

	});
};
