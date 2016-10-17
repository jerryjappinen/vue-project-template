
V.services.audio = {

	data: function () {
		return {

			// Simple one-time sounds under `app.paths.audio`
			toPreloadSimple: app.options.audio.simple,

			// Playback assets (music) under `app.paths.audio`
			toPreloadComplex: app.options.audio.complex,

			webSoundInstances: {}

		};
	},

	computed: {

		isAvailable: function () {
			return app.plugins.pizzicato && app.plugins.pizzicato.context ? true : false;
		},

		// Choose which plugin to use
		supportsNativeAudioPlugin: function () {
			return app.plugins.nativeAudio ? true : false;
		},

		preloadedKeys: function () {
			return []
				.concat(_.keys(this.toPreloadSimple))
				.concat(_.keys(this.toPreloadComplex));
		},

		fileFormat: function () {

			// FLAG: could have better browser detection here

			return 'mp3';
		}

	},

	methods: {



		// Helpers

		prefixPath: function (path) {
			return app.paths.audio + path;
		},

		suffixPath: function (path) {
			return path + '.' + this.fileFormat;
		},

		getPath: function (key, complex) {
			var arr = complex ? this.toPreloadComplex : this.toPreloadSimple;
			return this.prefixPath(this.suffixPath(arr[key]));
		},



		// API

		play: function (key) {
			if (this.supportsNativeAudioPlugin) {
				return this.playNative(key);
			}
			return this.playWeb(key);
		},

		pause: function (key) {
			if (this.supportsNativeAudioPlugin) {
				return this.stopNative(key);
			}
			return this.pauseWeb(key);
		},

		stop: function (key) {
			if (this.supportsNativeAudioPlugin) {
				return this.stopNative(key);
			}
			return this.stopWeb(key);
		},



		// Web

		preloadAllWeb: function () {
			var dfd = app.plugins.jQuery.Deferred();
			var callbackPromises = [];

			// Load complex and simple sounds separately
			for (var key1 in this.toPreloadSimple) {
				callbackPromises.push(this.preloadWeb(this.toPreloadSimple[key1]));
			}
			for (var key2 in this.toPreloadComplex) {
				callbackPromises.push(this.preloadWeb(this.toPreloadComplex[key2], true));
			}

			// Report self complete only after all children are ok
			app.plugins.jQuery.when.apply(app.plugins.jQuery, callbackPromises).done(function () {
				dfd.resolve();
			}).fail(function () {
				dfd.reject();
			});

			return dfd.promise();
		},

		preloadWeb: function (key, loop) {
			var dfd = app.plugins.jQuery.Deferred();

			var path = this.getPath(key, (loop ? true : false));

			var sound = new app.plugins.pizzicato.Sound({
				source: 'file',
				options: {

					// Defaults
					// volume: 1,
					// sustain: 0,
					// attack: 0.4,

					loop: (loop ? true : false),
					path: path
				}

			}, function (error) {
				if (error) {
					l('Error preloading audio assets (web): ' + error);
					dfd.reject();
				} else {
					dfd.resolve();
				}
			});

			// Store preloaded sound
			this.webSoundInstances[key] = sound;

			return dfd.promise();
		},

		// Playback

		pauseWeb: function (key) {
			this.webSoundInstances[key].pause();
			return this;
		},

		stopWeb: function (key) {
			this.webSoundInstances[key].stop();
			return this;
		},

		playWeb: function (key) {
			this.webSoundInstances[key].play();
			return this;
		},



		// .nativeAudio API

		preloadAllNative: function () {
			var dfd = app.plugins.jQuery.Deferred();
			var callbackPromises = [];

			// Load each asset
			for (var key1 in this.toPreloadSimple) {
				callbackPromises.push(this.preloadSimpleNative(key1));
			}
			for (var key2 in this.toPreloadComplex) {
				callbackPromises.push(this.preloadComplexNative(key2));
			}

			// Report self complete only after all children are ok
			app.plugins.jQuery.when.apply(app.plugins.jQuery, callbackPromises).done(function () {
				dfd.resolve();
			}).fail(function () {
				dfd.reject();
			});

			return dfd.promise();
		},

		preloadComplexNative: function (key) {
			var dfd = app.plugins.jQuery.Deferred();

			// Preload audio resources
			// (id, assetPath, volume, voices, delay, successCallback, errorCallback)
			app.plugins.nativeAudio.preloadComplex(
				key,
				this.getPath(key, true),
				1, // volume
				1, // voices (to allow overlapping) (2)
				0, // delay when crossfading (2 * 1000)
				function (message) {
					dfd.resolve();
				},
				function(error) {
					l('Error preloading audio assets (native): ' + error);
					dfd.reject(error);
				}
			);

			return dfd.promise();
		},

		preloadSimpleNative: function (key) {
			var dfd = app.plugins.jQuery.Deferred();

			// (id, assetPath, successCallback, errorCallback)
			app.plugins.nativeAudio.preloadSimple(
				key,
				this.getPath(key),
				function (message) {
					dfd.resolve();
				},
				function (error) {
					l('Error preloading audio assets (native): ' + error);
					dfd.reject(error);
				}
			);

			return dfd.promise();
		},



		// Native playback

		stopNative: function (key) {
			app.plugins.nativeAudio.stop(key);
			return this;
		},

		// Play a sound only once
		playOnceNative: function (key) {
			app.plugins.nativeAudio.play(key);
			return this;
		},

		// Play a sound, leaving complex ones looping
		playNative: function (key) {

			if (isComplex) {
				app.plugins.nativeAudio.loop(key);
			} else {
				app.plugins.nativeAudio.play(key);
			}

			return this;
		},



		// Life cycle

		// Preloading some assets
		afterLoad: function () {
			var dfd = app.plugins.jQuery.Deferred();

			// Native assets that support preloading
			if (this.supportsNativeAudioPlugin) {
				this.preloadAllNative().done(function () { dfd.resolve(); });

			// Web assets loaded with web API
			} else if (this.isAvailable) {
				this.preloadAllWeb().done(function () { dfd.resolve(); });
			}

			return dfd.promise();
		}



	},

	beforeDestroy: function () {

		// Unload all native audio from memory, oi vey
		if (this.supportsNativeAudioPlugin) {
			for (var i = 0; i < this.preloadedKeys.length; i++) {
				app.plugins.nativeAudio.unload(this.preloadedKeys[i]);
			}
		}

	}

};
