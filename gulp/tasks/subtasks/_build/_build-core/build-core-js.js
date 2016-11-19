// Compile generic JS source
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-core-js', function (callback) {
		plugins.runSequence(
			[
				'subtask-build-core-js-bower',
				'subtask-build-core-js-custom',
				'subtask-build-core-js-vendor'
			],
			'subtask-build-core-js-json',
			callback
		);
	});
};
