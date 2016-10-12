// Watch for changes in source files, recompile when needed
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-core-css', [
		'subtask-watch-core-css-custom',
		'subtask-watch-core-css-vendor'
	]);
};
