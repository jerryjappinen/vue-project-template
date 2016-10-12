// Copy compiled core assets into target folder in a format that makes sense
// https://www.npmjs.com/package/gulp-electron
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-bundle', function (callback) {
 
		var path = function (path) {
			return 'electron/' + (path ? path : '');
		};

		var packageJson = require(path('package.json'));

		return gulp.src('')
			.pipe(plugins.electron({
				src: config.targets['electron'],
				packageJson: packageJson,
				release: path('release'),
				cache: path('cache'),
				version: 'v' + config.buildOptions.electron.version,
				packaging: false, // ZIP
				platforms: config.buildOptions.electron.platforms,
				platformResources: {
					darwin: {
						icon: config.targets['electron'] + 'icon.icns',
						CFBundleDisplayName: packageJson.name,
						CFBundleIdentifier: packageJson.name,
						CFBundleName: packageJson.name,
						CFBundleVersion: packageJson.version
					},
					win: {
						"icon": config.targets['electron'] + 'icon.ico',
						"version-string": packageJson.version,
						"file-version": packageJson.version,
						"product-version": packageJson.version
					}
				}
			}))
			.pipe(gulp.dest(''));

	});
};
