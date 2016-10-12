// Compile Vue-specific source
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-vue', [
		// 'subtask-build-core-vue-bindings',
		'subtask-build-core-vue-templates'
	]);
};
