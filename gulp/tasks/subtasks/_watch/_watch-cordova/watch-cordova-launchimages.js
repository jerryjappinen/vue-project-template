// Watch for changes in sourve assets, rebuild to native project when needed
// FIXME:
// 	- this will always copy all images, even when only one has changed.
// 	- however in the future we want to scale and build from less source files, so this is what we want in the end
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-watch-cordova-launchimages', [
		'subtask-watch-cordova-launchimages-ios'
	]);
};
