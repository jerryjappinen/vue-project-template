// Watch for changes in compiled core asset files, move changed files to target when changes are detected
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova-coreassets', [
		'subtask-watch-cordova-coreassets-svg',
		'subtask-watch-cordova-coreassets-css',
		'subtask-watch-cordova-coreassets-js'
	]);
};