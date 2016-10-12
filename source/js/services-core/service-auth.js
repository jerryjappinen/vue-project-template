
V.services.auth = {

	data: function () {
		return {
			hello: app.plugins.hello,
			serviceConfig: app.options.auth.services,
			eventNames: {
				login: 'auth.login'
			}
		};
	},

	computed: {

		isAvailable: function () {
			if (this.hello && !_.isEmpty(this.serviceConfig)) {
				return true;
			}
			return false;
		},

		services: function () {
			if (this.isAvailable) {
				return this.consumeHelloServiceList(this.hello.services);
			}
			return {};
		},

		canConnectToGoogle: function () {
			if (this.serviceConfig.google && this.serviceConfig.google.clientId) {
				return true;
			}
			return false;
		}

	},

	methods: {

		// Helpers

		// Wrapper for normalizing Hello's service objects
		consumeHelloServiceList: function (helloServices) {
			var services = {};
			for (var key in helloServices) {
				services[key] = this.consumeHelloService(helloServices[key]);
			}
			return services;
		},

		consumeHelloService: function (service) {
			return service;
		},



		// Connect

		connect: function () {
			
			// Google
			if (this.canConnectToGoogle) {
				this.connectToGoogle();
			}

		},



		// Connect to Google

		connectToGoogle: function () {

			// Set up auth provider credentials
			hello.init({
				google: this.serviceConfig.google.clientId
			}, { redirect_uri: '/' });

			// Listen for login events
			if (this.hello) {
				this.hello.on(this.eventNames.login, function (auth) {

					// Call user information, for the given network
					hello(auth.network).api('me').then(function (response) {
						console.log('Logged in!', auth, response);
					});

				});
			}

		},



		// Life cycle

		onInit: function () {

			if (this.isAvailable) {
				this.connect();
			}

		}

	}

};
