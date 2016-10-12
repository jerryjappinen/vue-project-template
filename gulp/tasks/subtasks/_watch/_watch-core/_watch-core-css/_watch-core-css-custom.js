// Watch for changes in source files, recompile when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-core-css-custom', function () {
		plugins.watch(config.source['css'], function () {
			gulp.start('subtask-build-core-css-custom');
		});
	});
};
