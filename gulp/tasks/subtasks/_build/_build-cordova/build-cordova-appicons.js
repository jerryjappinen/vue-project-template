// Copy app icon assets into native project resource folders
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-cordova-appicons', function (callback) {

		var subtasks = [];
		var cordovaPlatforms = helpers.getCordovaPlatforms();
		for (var i = 0; i < cordovaPlatforms.length; i++) {
			subtasks.push('subtask-build-cordova-appicons-' + cordovaPlatforms[i]);
		}

		plugins.runSequence(
			subtasks,
			callback
		);

	});

};
