// Watch for changes in source files, recompile when needed
module.exports = function (gulp, plugins, config, helpers) {

	// Shared vendor files
	var paths = config.source['vendor']['all'];

	// Vendor files for dev builds
	if (helpers.isDebug()) {
		paths = paths.concat(config.source['vendor']['debug']);

	// Vendor files for production builds
	} else {
		paths = paths.concat(config.source['vendor']['production']);
	}

	// Get JS files
	for (var i = 0; i < paths.length; i++) {
		paths[i] = paths[i] + '**/*.css';
	}

	gulp.task('subtask-watch-core-css-vendor', function () {
		plugins.watch(paths, function () {
			gulp.start('subtask-build-core-css-vendor');
		});
	});
};
