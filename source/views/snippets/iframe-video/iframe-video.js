
V.views['iframe-video'] = {

	props: [
		'src',

		// '4-3'
		// '16-9'
		// '16-10'
		'ratio'

	],

	data: function () {
		return {
		};
	},

	computed: {

		classes: function () {
			var ratio = this.ratio ? this.ratio : '16-9';
			return 'is-' + ratio;
		}

	}

};
