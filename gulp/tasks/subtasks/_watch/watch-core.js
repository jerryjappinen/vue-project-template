// Watch for everything needed to keep core build updated
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-core', [
		'subtask-watch-core-svg',
		'subtask-watch-core-css',
		'subtask-watch-core-js',
		'subtask-watch-core-vue-templates'
	]);
};
