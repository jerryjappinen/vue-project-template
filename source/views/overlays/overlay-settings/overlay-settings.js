
V.views['overlay-settings'] = {

	props: [
		'main',
		'props'
	],

	data: function () {
		return {
		};
	},

	computed: {

		callback: function () {
			if (this.props.callback && _.isFunction(this.props.callback)) {
				return this.props.callback;
			}
			return null;
		},

		isInterrogative: function () {
			if (this.props.ask && this.callback) {
				return true;
			}
			return false;
		},

		message: function () {
			if (this.props.message) {
				return this.props.message;
			} else if (this.isInterrogative) {
				return 'Are you sure?';
			}
			return 'Done.';
		}

	},

	methods: {

		toggleSounds: function (event) {
			alert('Sounds toggled on/off');
		},

		rate: function (event) {
			alert('Opening App Store');
		},

		share: function (event) {
			alert('Share this yo');
		},

		back: function (event) {
			return this.main.overlayBack();
		}

	}

};
