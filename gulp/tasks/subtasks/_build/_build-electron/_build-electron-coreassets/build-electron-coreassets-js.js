// Copy compiled scripts from core into target folder
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-coreassets-js', function () {

		// Fetch assets to copy
		var files = gulp.src(helpers.getCoreJsFileNames());

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (js for electron): '
			})))

			// Concatenate into one file
			.pipe(plugins.concat('app.js', { newLine: config.buildOptions.jsNewLine }))

			.pipe(gulp.dest(config.targets['electron'] + config.buildOptions.coreAssetPath));
	});

};
