
// Start app when we're done
// NOTE: `window.clientConfig` is produced by Gulp pipeline and injected by `init.swig`
document.addEventListener(clientConfig.initEvent, function (event) {

	// try {

		// Global setup

		// Global libraries
		window.P.bootstrap(clientConfig.plugins, clientConfig.debug);

		// Vue blueprints should be there by now, let's treat all of it so the app can be initiated
		window.V.bootstrap(clientConfig);



		// Client app setup

		// Initialize main Vue app
		// Export `app` to global scope
		// NOTE: yeah this sucks but it's just easier for everyone
		window[clientConfig.mainVariableName] = new Vue(V.app);

		// Pass options and plugins
		window[clientConfig.mainVariableName].plugins = P.getAll();
		window[clientConfig.mainVariableName].options = clientConfig;

		// Run all services
		window[clientConfig.mainVariableName].run();

	// } catch (e) {
	// 	window.fooBar = e;
	// }

}, false);
