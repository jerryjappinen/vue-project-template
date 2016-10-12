module.exports = function (main) {
	return function () {
		var electronPlatform = main.args.electronplatform;
		return electronPlatform && electronPlatform.length ? [electronPlatform] : main.config.buildOptions.electron.platforms;
	};
};
