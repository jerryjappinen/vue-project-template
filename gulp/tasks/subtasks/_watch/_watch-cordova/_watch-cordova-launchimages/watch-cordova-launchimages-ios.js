// Watch for changes in compiled templates, recompile index when appropriate
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova-launchimages-ios', function () {

		// Assets to copy
		var platform = 'ios';
		var files = config.source[platform]['launchImages'] + '**/*.{jpg,png}';

		// Watch
		plugins.watch(files, function () {
			gulp.start('subtask-build-cordova-launchimages-ios');
		});

	});
};
