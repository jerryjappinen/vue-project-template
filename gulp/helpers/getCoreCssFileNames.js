module.exports = function (main) {
	return function () {
		return [
			main.config.targets['core'] + 'bower.css',
			main.config.targets['core'] + 'vendor.css',
			main.config.targets['core'] + 'custom.css'
		];
	};
};
