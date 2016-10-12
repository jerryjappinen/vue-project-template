
V.services.navigation = {

	data: function () {
		return {
			options: null
		};
	},

	computed: {},

	methods: {

		// API

		// // Router 'go' will be assigned to this
		// go: function () {},

		goBack: function (objectType, data) {
			window.history.back();
			return this;
		},



		// Helpers

		onInit: function () {

			// Map this service's API to VueRouter methods for convenience
			if (VueRouter) {
				this.go = app.$router.go;
			}

		}

	}

};
