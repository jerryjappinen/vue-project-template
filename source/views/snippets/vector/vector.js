
V.views['vector'] = {

	props: [
		'src'
	],

	data: function () {
		return {
			html: ''
		};
	},

	computed: {

		html: function () {
			return this.getHtml(this.src);
		},

		classes: function () {
			return 'view-vector-' + this.src;
		}

	},

	methods: {

		getHtml: function (src) {
			return '<svg><use xlink:href="' + app.paths.svg + '#' + src + '"></use></svg>';
		}

	}

};
