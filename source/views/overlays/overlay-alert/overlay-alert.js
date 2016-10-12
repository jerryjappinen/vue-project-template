
V.views['overlay-alert'] = {

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

		cancel: function (event) {
			return this.main.overlayBack();
		},

		acknowledge: function (event) {
			if (this.isInterrogative) {
				this.callback();
			}
			return this.cancel();
		}

	}

};
