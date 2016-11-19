
V.views['frame'] = {

	// Incoming
	// props: [],

	// Properties
	// FLAG:
	// 	- for some reason I have to have this here for app dependency management to work
	// 	- probably because this is used as the main app component by the router
	// 	- but this is not explained anywhere, though
	// 	- seems to kill or enable the use of app global in ALL components used throughout the app??
	data: function () {
		return {
			app: app
		};
	},

	// Computed properties
	computed: {

		// Render splash before app is ready?
		shouldRenderSplash: function () {
			return false;
		},

		shouldRenderHome: function () {
			return !this.shouldRenderSplash;
		},

		showStatusbarBackground: function () {
			return app.env.isIos;
		},



		// Bindings
		state: function () {
			return {
				web: app.env.isWeb,
				ios: app.env.isIos,
				android: app.env.isAndroid,
				online: app.network.online
			};
		},

		classes: function () {
			var classes = [];
			for (var key in this.state) {
				classes.push((this.state[key] ? 'is-' : 'not-') + key);
			}
			return classes.join(' ');
		}

	},

	methods: {

		// Smart banner plugin handling
		activateSmartBanner: function () {
			if (app.plugins.smartBanner) {
				new app.plugins.smartBanner({
					// force: 'ios', // Uncomment for platform emulation
					daysHidden: 21,   // days to hide banner after close button is clicked (defaults to 15)
					daysReminder: 7, // days to hide banner after "VIEW" button is clicked (defaults to 90)
					// appStoreLanguage: 'us', // language code for the App Store (defaults to user's browser language)
					title: app.options.meta.title,
					author: app.options.meta.company,
					button: 'OPEN',
					store: {
						// windows: 'Windows Store',
						// android: 'Google Play',
						ios: 'App Store'
					},
					price: {
						windows: 'FREE',
						android: 'FREE',
						ios: 'FREE'
					}
				});
			}
			return this;
		},

		onClick: function (event) {
			var el = event.target;

			if (
				el.tagName.toLowerCase() === 'a' &&
				app.util.linkIsExternal(el)
			) {
				el.target = '_blank';

				// App
				if (app.env.isCordova && app.browser) {
					event.preventDefault();
					app.browser.open(el.href, true, el.getAttribute('data-system'));
				}

			}

		}

	},

	mounted: function () {
		var vm = this;

		// URL link clicks within this frame
		// NOTE: we treat <a> tag as links, as they should be. Other elements are buttons.
		this.$el.addEventListener('click', this.onClick);

		// Only show smart banner when it's needed
		if (app.env.isWeb) {
			this.activateSmartBanner();
		}

	},

	beforeDestroy: function () {
		this.$el.removeEventListener('click', this.onClick);
	}

};
