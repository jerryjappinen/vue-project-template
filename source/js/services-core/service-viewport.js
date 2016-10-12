
V.services.viewport = {

	data: function () {
		return {
			width: 0,
			height: 0
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
		jQuery(window).on('resize', _.throttle(this.updateDimensions, 50, {
			leading: true
		}));

		// Bind FastClick
		FastClick.attach(document.body);

	},

	beforeDestroy: function () {
		window.removeEventListener('resize', this.updateDimensions);
	}

};
