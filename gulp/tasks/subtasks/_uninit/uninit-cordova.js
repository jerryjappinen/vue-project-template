// Nuke the entire cordova project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-uninit-cordova', function (callback) {
		return plugins.del([
			config.buildOptions.cordova.paths.root + '**/*'
		], callback);
	});
};