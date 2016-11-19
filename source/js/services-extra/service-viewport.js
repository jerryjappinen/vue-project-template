
V.services.viewport = {

	data: function () {
		return {
			width: 0,
			height: 0,
			callback: null
		};
	},

	computed: {},

	methods: {

		// Behavior

		getHeight: function () {
			return window.innerHeight;
		},

		getWidth: function () {
			return window.innerWidth;
		},

		getRealDimensions: function () {
			return [this.getWidth(), this.getHeight()];
		},

		updateDimensions: function () {
			this.width = this.getWidth();
			this.height = this.getHeight();
			return this;
		},

		onInit: function () {
			this.updateDimensions();
		}

	},

	created: function () {

		// VueTouch.config.tap = {
		// 	time: 600,
		// 	interval: 600
		// };

		// Bind resize listener
		this.callback = app.lifecycle.register('resize', _.throttle(this.updateDimensions, 50, {
			leading: true
		}));

	},

	beforeDestroy: function () {
		app.lifecycle.unregister('resize', this.callback);
	}

};
