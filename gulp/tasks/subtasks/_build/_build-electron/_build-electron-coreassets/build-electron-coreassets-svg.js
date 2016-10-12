// Copy compiled styles from core into target folder
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-build-electron-coreassets-svg', function () {

		// Fetch assets to copy
		var files = gulp.src([
			config.targets['core'] + config.buildOptions['svg']['spriteFileName'] + '.symbol.html',
			config.targets['core'] + config.buildOptions['svg']['spriteFileName'] + '.svg'
		]);

		return files
			.pipe(plugins.plumber())

			// Log files
			.pipe(plugins.if(helpers.isDebug(), plugins.debug({
				title: 'File (svg for electron): '
			})))

			.pipe(gulp.dest(config.targets['electron'] + config.targets['public']));
	});

};
