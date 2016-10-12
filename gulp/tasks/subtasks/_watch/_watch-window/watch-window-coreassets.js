// Watch for changes in compiled core asset files, move changed files to target when changes are detected
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-window-coreassets', [
		'subtask-watch-window-coreassets-svg',
		'subtask-watch-window-coreassets-css',
		'subtask-watch-window-coreassets-js'
	]);
};