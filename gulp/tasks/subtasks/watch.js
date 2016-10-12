// Watch all
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch', [
		'subtask-watch-project-config',
		'subtask-watch-core',
		'subtask-watch-cordova',
		'subtask-watch-window'
	]);
};
