module.exports = function (main) {
	return function (str) {
		return ('' + str).replace(/ /g,'');
	};
};