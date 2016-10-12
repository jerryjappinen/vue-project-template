// Prune bower packages
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-uninit-bower', function (callback) {
		return plugins.del([
			config.source.bowerComponents + '**/*'
		], callback);
	});
};