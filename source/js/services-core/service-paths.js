
V.services.paths = {

	data: function () {
		return {
			public: app.options.paths.public ? app.options.paths.public : 'public/',
			// json: app.options.paths.json ? app.options.paths.json : 'public/json/',
			svg: app.options.paths.svg ? app.options.paths.svg : 'public/sprite.svg',
			images: app.options.paths.images ? app.options.paths.images : 'public/images/',
			audio: app.options.paths.audio ? app.options.paths.audio : 'public/audio/',
			fonts: app.options.paths.fonts ? app.options.paths.fonts : 'public/fonts/'
		};
	},

	computed: {},

	methods: {}

};
