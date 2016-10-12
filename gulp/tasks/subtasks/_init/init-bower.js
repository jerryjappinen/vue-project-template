// Install bower packages
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-init-bower', function (callback) {
		return plugins.bower({
			cmd: 'install',
			directory: config.source.bowerComponents
		});
	});
};