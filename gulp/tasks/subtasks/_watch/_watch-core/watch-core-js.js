// Watch for changes in source files, recompile when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-core-js', [
		'subtask-watch-core-js-custom',
		'subtask-watch-core-js-vendor'
	]);
};
