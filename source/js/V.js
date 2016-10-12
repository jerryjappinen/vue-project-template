
// Bootstrapping Vue
var V = {

	// Blueprints
	// We can load stuff here to be treated and accessed later

	// Root app
	app: null,

	// Vue config, see
	// https://vuejs.org/api/#Global-Config
	config: {},

	// Generic content types
	contentTypes: {},

	// Routes will go here once treated, based on manifest
	// See https://github.com/vuejs/vue-router/blob/next-doc/docs/en/advanced-routing/nested.md
	// NOTE:
	// 	Use a string of a component you've included under `views` for `component` here. The bootstrap function will dig up the view object during bootstrapping so it works with VueRouter.
	routes: [

		// {
		// 	path: '/foo',
		// 	name: 'foo',
		// 	component: 'foo',
		// 	children: [ { path: '/bar' } ]
		// }

	],

	// Global state
	services: {},

	// Vue components will be put here and registered upon init
	views: {},



	// Bootstrapping logic

	// Turn registered service blueprints into Vue object prototypes
	bootstrapConfig: function (clientConfig) {

		// Ensure Vue will respect project setting for debugging options
		this.config.debug = clientConfig.debug;
		this.config.devtools = clientConfig.debug;

		// Pass config options to Vue
		for (var key in this.config) {
			Vue.config[key] = this.config[key];
		}

		return this;
	},

	// Turn Vue component blueprints that have been registered so far into Vue objects and register them with Vue
	bootstrapViews: function () {

		for (var viewName in this.views) {

			// Vue expects us to specify name in the blueprint, let's use the key and add it
			this.views[viewName]['name'] = viewName;

			// Turn blueprint into a Vue object prototype
			this.views[viewName] = Vue.extend(this.views[viewName]);

			// Load component into Vue
			Vue.component(viewName, this.views[viewName]);
		}

		return this;
	},

	// Turn registered service blueprints into Vue object prototypes
	bootstrapServices: function () {
		for (var serviceName in this.services) {
			this.services[serviceName] = Vue.extend(_.merge({}, this.services[serviceName]));
		}
		return this;
	},

	// Turn registered content type blueprints into Vue object prototypes
	bootstrapContentTypes: function () {
		for (var contentTypeName in this.contentTypes) {
			this.contentTypes[contentTypeName] = Vue.extend(_.merge({}, this.contentTypes[contentTypeName]));
		}
		return this;
	},

	// Treat string-based route config for VueRouter, which expects Vue component object prototypes
	bootstrapRoutes: function (clientConfig) {

		// Use router to render
		if (VueRouter) {

			// Set up router plugin so that <router-view>, <router-link>, $router and $route work
			Vue.use(VueRouter);

			// Use routes defined in project settings, but update to a format the router can use
			this.routes = this.sanitizeRoutes(clientConfig.routes);

			// NOTE: VueRouter will want to have a reference to itself in the App object, merged with other options
			var options = _.merge({ routes: this.routes }, clientConfig.routerOptions);

			// Inject the router instance to the root of the app object
			this.app.router = new VueRouter(options);

		}

		return this;
	},

	// All together now...
	bootstrap: function (clientConfig) {
		return this
			.bootstrapConfig(clientConfig)
			.bootstrapViews()
			.bootstrapServices()
			.bootstrapContentTypes()
			.bootstrapRoutes(clientConfig);
	},



	// Misc. helper methods

	// Routes need some treatment due to VueRouter funkyness
	sanitizeRoute: function (route) {
		var newRoute = {};
		for (var key in route) {
			var value = route[key];

			// Template value provided as string, but VueRouter expects a Vue component object prototype
			if (key === 'component' && typeof value === 'string') {
				newRoute[key] = this.views[value];

			// Children will be treated recursively
			} else if (key === 'children') {
				newRoute[key] = this.sanitizeRoutes(value);

			// Anything else gets copied over
			} else {
				newRoute[key] = value;
			}

		}
		return newRoute;
	},

	// Treat a route array, either root or nested
	sanitizeRoutes: function (routes) {
		var newRoutes = [];
		for (var i = 0; i < routes.length; i++) {
			newRoutes.push(this.sanitizeRoute(routes[i]));
		}
		return newRoutes;
	}

};
