module.exports = function (main) {
	return function (filename, string) {
		var src = require('stream').Readable({ objectMode: true });

		src._read = function () {
			this.push(new main.plugins.util.File({
				cwd: "",
				base: "",
				path: filename,
				contents: new Buffer(string)
				}));

			this.push(null);

		};

		return src;
	};
};
