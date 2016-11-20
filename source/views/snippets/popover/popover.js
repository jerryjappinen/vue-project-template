
V.views['popover'] = {

	props: [
		'value', // shouldBeShown
		'fullscreen',
		'inPlace'
	],

	data: function () {
		return {
			callback: null
		};
	},

	computed: {

		isFullscreen: function () {
			return !_.isUndefined(this.fullscreen);
		},

		isInPlace: function () {
			return !_.isUndefined(this.inPlace);
		},

		state: function () {
			return {
				shown: this.value,
				fullscreen: this.isFullscreen,
				inPlace: this.isInPlace
			};
		},

		classes: function () {
			return app.util.getStateClassNames(this.state);
		}

	},

	methods: {

		onBackgroundClick: function (event) {
			if (event.target == this.$refs.background) {
				event.stopPropagation();
				this.close();
			}
		},

		close: function () {
			this.$emit('input', false);
		}

	},

	mounted: function () {
		this.callback = app.lifecycle.register('blur', this.close);
	},

	beforeDestroy: function () {
		if (this.callback) {
			app.lifecycle.unregister('blur', this.close);
		}
	}

};
