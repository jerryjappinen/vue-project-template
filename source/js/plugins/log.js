
// LogLevel
// https://github.com/pimterry/loglevel
P.callbacks.log = function (debug) {
	// window.log = log.noConflict();

	// Global shorthand
	// FLAG: shouldn't do this probably but this makes development much less painful
	window.l = log.trace;

	// Allow tracing things easily with the loglevel plugin
	// log.trace .debug .info .warn .error
	if (debug) {
		log.setLevel(log.levels.TRACE, false);
	} else {
		log.setLevel(log.levels.SILENT, false);
	}

};
