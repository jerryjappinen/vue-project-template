// Generate a fresh Cordova project
module.exports = function (gulp, plugins, config, helpers) {
	gulp.task('subtask-init-cordova-project', function (callback) {

		// // New instance of Cordova targeting our Cordova project directory
		// NOTE: this command has a weird issue where it builds the project under root/root/
		var cordova = new plugins.nodeCordova(config.buildOptions.cordova.paths.root, true);

		// Generate package name for new projct
		var packageName = helpers.trimWhitespace(('com' + '.' + config.meta.company + '.' + config.meta.title).toLowerCase());

		// Generate fresh project
		console.log('Creating fresh Cordova project...');
		cordova.create(packageName, config.meta.title, function (err) {
			if (err) {
				console.log(err);
			}
			return callback();
		});

	});

};