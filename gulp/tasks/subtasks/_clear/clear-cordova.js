// Prune the app's cordova build target
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-clear-cordova', function (callback) {
		return plugins.del([
			config.targets['cordova'] + '**/*'
		], callback);
	});
};
