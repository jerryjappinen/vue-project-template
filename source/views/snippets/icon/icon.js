
V.views['icon'] = {

	props: [
		'src',
		'mono'
	],

	data: function () {
		return {
			html: '',
			isMono: false
		};
	},

	computed: {

		isMono: function () {
			if (this.mono) {
				return true;
			} else if (this.mono === false || this.mono === 0 || this.mono === null) {
				return false;
			}
			return this.src ? this.getIsMono(this.src) : true;
		},

		html: function () {
			return this.getHtml(this.src);
		},

		classes: function () {
			return (this.isMono ? 'is-mono' : 'not-mono') + (' view-icon-' + this.src);
		}

	},

	methods: {

		getIsMono: function (src) {
			return (src.substr(-8) !== '-colored');
		},

		getHtml: function (src) {
			return '<svg><use xlink:href="' + app.paths.svg + '#' + src + '"></use></svg>';
		}

	}

};
