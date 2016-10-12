// Watch for everything needed to keep window  build synced with core
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova', [
		'subtask-watch-cordova-coreassets',
		'subtask-watch-cordova-appicons',
		'subtask-watch-cordova-launchimages',
		'subtask-watch-cordova-main',
		'subtask-watch-cordova-public'
	]);
};
