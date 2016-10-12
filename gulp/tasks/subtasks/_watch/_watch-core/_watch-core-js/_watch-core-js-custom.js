// Watch for changes in source files, recompile when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-core-js-custom', function () {
		plugins.watch(config.source['js'], function () {
			gulp.start('subtask-build-core-js-custom');
		});
	});
};
