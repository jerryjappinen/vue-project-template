// Watch for changes in source files, recompile when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-core-svg', function () {
		plugins.watch(config.source['svg'], function () {
			gulp.start('subtask-build-core-svg');
		});
	});
};