// Watch for everything needed to keep window  build synced with core
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-window', [
		'subtask-watch-window-coreassets',
		'subtask-watch-window-main',
		'subtask-watch-window-public'
	]);
};