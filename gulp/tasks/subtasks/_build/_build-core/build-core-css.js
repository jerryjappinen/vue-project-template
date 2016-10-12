// Compile CSS source
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-css', [
		'subtask-build-core-css-bower',
		'subtask-build-core-css-custom',
		'subtask-build-core-css-vendor'
	]);
};
