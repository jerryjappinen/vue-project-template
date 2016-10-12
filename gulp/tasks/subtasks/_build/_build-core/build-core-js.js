// Compile generic JS source
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-js', [
		'subtask-build-core-js-bower',
		'subtask-build-core-js-custom',
		'subtask-build-core-js-vendor'
	]);
};
