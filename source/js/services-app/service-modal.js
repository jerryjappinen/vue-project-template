
// Sample UI service for global UI tasks such as toggling modal dialogs

V.services.modal = {

	data: function () {
		return {
			viewId: null,
			isShown: false
		};
	},

	computed: {

		modalIsVisible: function () {
			return this.show && this.viewId ? true : false;
		}

	},

	methods: {

		show: function (viewId) {
			if (viewId) {
				this.viewId = viewId;
			}
			this.isShown = true;
			return this;
		},

		close: function () {
			this.isShown = false;
			return this;
		}

	}

};
