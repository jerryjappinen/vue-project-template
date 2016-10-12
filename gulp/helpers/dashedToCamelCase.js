module.exports = function (main) {
	return function (str) {
		return str.toLowerCase().replace(/-(.)/g, function (match, group1) {
			return group1.toUpperCase();
		});
	};
};