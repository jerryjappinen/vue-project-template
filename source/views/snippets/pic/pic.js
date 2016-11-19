
V.views['pic'] = {

	props: [
		'width',
		'height',
		'defer',
		'alt',
		'src',
		'background',
		'block'
	],

	data: function () {
		return {
			isLoaded: false,
			isFailed: false,
			isLoadedWatcher: null
		};
	},

	computed: {

		url: function () {
			if (this.src.substr(0, 4) == 'http') {
				return this.src;
			}
			return app.paths.public + this.src;
		},

		classes: function () {
			return {
				'is-loaded' : this.isLoaded,
				'is-failed' : this.isFailed,
				'has-background' : this.background,
				'block': this.block
			};
		},

		style: function () {
			return !this.background ? {} : {
				backgroundImage: 'url(' + this.url + ')'
			};
		}

	},

	methods: {

		isLoadedDoneCallback: function () {
			this.isLoaded = true;
		},

		isLoadedFailCallback: function () {
			this.isFailed = true;
		}

	},

	mounted: function () {
		var options = {};
		var selector = this.$el;

		// Tweak selector if we're not using background
		if (this.background) {
			options.background = true;
		} else {
			selector = selector.getElementsByTagName('img')[0];
		}

		// Fancy loading
		// http://imagesloaded.desandro.com/#background
		if (app.plugins.imagesLoaded && this.defer) {	
			this.isLoadedWatcher = app.plugins.imagesLoaded(selector, options);
			this.isLoadedWatcher.on('done', this.isLoadedDoneCallback);
			this.isLoadedWatcher.on('fail', this.isLoadedFailCallback);

		// Show immediately
		} else {
			this.isLoaded = true;
		}

	},

	beforeDestroy: function () {
		if (this.isLoadedWatcher) {	
			this.isLoadedWatcher.off('done', this.isLoadedDoneCallback);
			this.isLoadedWatcher.off('fail', this.isLoadedFailCallback);
		}
	}

};
