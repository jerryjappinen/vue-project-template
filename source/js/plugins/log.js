
// LogLevel
// https://github.com/pimterry/loglevel
P.callbacks.log = function (debug) {
	// window.log = log.noConflict();

	// Global shorthand
	// FLAG: shouldn't do this probably but this makes development much less painful
	// window.l = window.log.trace;

	// Allow tracing things easily with the loglevel plugin
	// log.trace .debug .info .warn .error
	if (debug) {
		window.log.setLevel(window.log.levels.TRACE, false);
	} else {
		window.log.setLevel(window.log.levels.SILENT, false);
	}

};
