module.exports = function (main) {
	return function () {
		return [
			main.config.targets['core'] + 'bower.js',
			main.config.targets['core'] + 'vendor.js',
			main.config.targets['core'] + 'custom.js',
			// main.config.targets['core'] + 'vueViewModels.js',
			main.config.targets['core'] + 'vueTemplates.js'
		];
	};
};
