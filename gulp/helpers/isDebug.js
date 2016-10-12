module.exports = function (main) {
	return function () {
		return main.args.debug ? true : false;
	};
};