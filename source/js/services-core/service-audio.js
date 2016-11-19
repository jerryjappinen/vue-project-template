
V.services.audio = {

	data: function () {
		return {

			isLoaded: false,

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
			var vm = this;
			return new Promise(function (resolve, reject) {

				var promises = [];

				// Load complex and simple sounds separately
				for (var key1 in vm.toPreloadSimple) {
					promises.push(vm.preloadWeb(vm.toPreloadSimple[key1]));
				}
				for (var key2 in vm.toPreloadComplex) {
					promises.push(vm.preloadWeb(vm.toPreloadComplex[key2], true));
				}

				// Report self complete only after all children are ok
				Promise.all(promises).then(function () {
					resolve();
				}, function (error) {
					reject(error);
				});

			});
		},

		preloadWeb: function (key, loop) {
			var vm = this;
			return new Promise(function (resolve, reject) {

				var path = vm.getPath(key, (loop ? true : false));

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
						reject(error);
					} else {
						resolve();
					}
				});

				// Store preloaded sound
				vm.webSoundInstances[key] = sound;

			});

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
			var vm = this;
			return new Promise(function (resolve, reject) {

				var promises = [];

				// Load each asset
				for (var key1 in vm.toPreloadSimple) {
					promises.push(vm.preloadSimpleNative(key1));
				}
				for (var key2 in vm.toPreloadComplex) {
					promises.push(vm.preloadComplexNative(key2));
				}

				// Report self complete only after all children are ok
				Promise.all(promises).then(function () {
					resolve();
				}, function (error) {
					reject(error);
				});

			});

		},

		preloadComplexNative: function (key) {
			var vm = this;
			return new Promise(function (resolve, reject) {

				// Preload audio resources
				// (id, assetPath, volume, voices, delay, successCallback, errorCallback)
				app.plugins.nativeAudio.preloadComplex(
					key,
					vm.getPath(key, true),
					1, // volume
					1, // voices (to allow overlapping) (2)
					0, // delay when crossfading (2 * 1000)
					function (message) {
						resolve();
					},
					function (error) {
						reject(error);
					}
				);

			});
		},

		preloadSimpleNative: function (key) {
			var vm = this;
			return new Promise(function (resolve, reject) {

				// (id, assetPath, successCallback, errorCallback)
				app.plugins.nativeAudio.preloadSimple(
					key,
					vm.getPath(key),
					function (message) {
						resolve();
					},
					function (error) {
						reject(error);
					}
				);

			});
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

		setIsLoaded: function () {		
			this.isLoaded = true;
		},

		// Preloading some assets
		afterMount: function () {

			// Native assets that support preloading
			if (this.supportsNativeAudioPlugin) {
				this.preloadAllNative().then(this.setIsLoaded);

			// Web assets loaded with web API
			} else if (this.isAvailable) {
				this.preloadAllWeb().then(this.setIsLoaded);

			} else {
				this.setIsLoaded();
			}

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
