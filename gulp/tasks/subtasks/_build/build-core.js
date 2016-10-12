// Compile source
module.exports = function (gulp, plugins, config, helpers) {
	var tasks = [
		'subtask-build-core-css',
		'subtask-build-core-svg',
		'subtask-build-core-js',
		'subtask-build-core-vue'
	];
	gulp.task('subtask-build-core', tasks);
};
