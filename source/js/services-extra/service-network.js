
// Wrapper service to understand current network status

V.services.network = {

	data: function () {
		return {

			// Simple properties
			appCache: window.applicationCache,
			connection: navigator.connection || app.plugins.connection,
			navigator: window.navigator,

			// Properties
			online: false,
			connecting: true

		};
	},

	// computed: {},

	methods: {

		// Setters

		setOffline: function () {
			this.online = false;
			return this;
		},

		setOnline: function () {
			this.online = true;
			return this;
		},

		updateOnlineStatus: function () {
			this.online = this.getOnlineStatus();
			return this;
		},



		// Helpers

		getNetworkType: function () {
			if (this.connection && this.connection.type) {
				return this.connection.type;
			}
			return null;
		},

		getOnlineStatus: function () {
			return this.navigator.onLine ? true : false;
		},

		getCacheStatus: function () {
			switch (this.appCache.status) {
				case this.appCache.UNCACHED:
					return 'uncached';
					// break;
				case this.appCache.IDLE:
					return 'idle';
					// break;
				case this.appCache.CHECKING:
					return 'checking';
					// break;
				case this.appCache.DOWNLOADING:
					return 'downloading';
					// break;
				case this.appCache.UPDATEREADY:
					return 'updateready';
					// break;
				case this.appCache.OBSOLETE:
					return 'obsolete';
					// break;
				default:
					return 'uknown';
					// break;
			}
		},

		cacheReadyToUpdate: function () {
			return this.getCacheStatus() === 'updateready';
		},



		// Life cycle

		onInit: function () {

			// Set online status
			this.online = this.getOnlineStatus();
			this.connecting = false;

			// Subs
			window.addEventListener('online',  this.updateOnlineStatus);
			window.addEventListener('offline', this.updateOnlineStatus);

			// Attempt to update application cache
			if (this.cacheReadyToUpdate()) {
				this.appCache.update();
			}

		}

	}

};
