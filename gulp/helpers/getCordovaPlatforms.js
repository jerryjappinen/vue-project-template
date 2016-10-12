module.exports = function (main) {
	return function () {
		var cordovaPlatform = main.args.cordovaplatform;
		return cordovaPlatform && cordovaPlatform.length ? [cordovaPlatform] : main.config.buildOptions.cordova.platforms;
	};
};
