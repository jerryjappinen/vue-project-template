
V.services.env = {

	data: function () {
		return {

			// Depending on the device, a few examples are:
			//   - "Android"
			//   - "BlackBerry 10"
			//   - "browser"
			//   - "iOS"
			//   - "WinCE"
			//   - "Win32NT"
			//   - "Tizen"
			//   - "Mac OS X"
			// https://github.com/apache/cordova-plugin-device
			platformNames: {
				'blackberry 10': 'blackberry',
				'browser': 'web',
				'i os': 'ios',
				'wince': 'windows',
				'win32nt': 'windows',
				'mac os x': 'mac'
			},

			browserNames: [
				'opera',
				'firefox',
				'safari',
				'ie',
				'edge',
				'chrome',
				'blink'
			]

		};
	},

	computed: {

		// High-level environment checking

		// FLAG: iOS/Android checking etc. is shitty, look up cordova docs on how to do this properly
		is: function () {
			return app.options.env;
		},

		isCordova: function () {
			return (this.is === 'cordova');
		},

		isElectron: function () {
			return (this.is === 'electron');
		},

		isWeb: function () {
			return (!this.isCordova && !this.isElectron);
		},



		// Getting info

		browser: function () {
			for (var i = 0; i < this.browserNames.length; i++) {
				var name = this.browserNames[i];
				if (this[_.camelCase('get-is-' + name)]()) {
					return name;
				}
			}
			return null;
		},

		platform: function () {

			// Web
			if (this.isWeb) {
				return 'web';

			// Normalize name for Cordova platform
			} else if (this.isCordova && app.plugins.device) {
				var id = _.lowerCase(app.plugins.device.platform);
				return this.platformNames[id] ? this.platformNames[id] : id;

			// Electron stuff
			} else if (this.isElectron) {
				return 'mac'; // FLAG: -_-
			}

			return null;
		},

		version: function () {
			if (this.isCordova && app.plugins.device) {
				return app.plugins.device.version;
			}
			return null;
		},

		uuid: function () {
			if (this.isCordova && app.plugins.device) {
				return app.plugins.device.uuid;
			}
			return null;
		},



		// Exact

		cordovaVersion: function () {
			if (this.isCordova && app.plugins.device) {
				return app.plugins.device.cordova;
			}
			return null;
		},



		// Use these to check for a specific platform

		isMac: function () { return (this.platform === 'mac'); },
		isTizen: function () { return (this.platform === 'tizen'); },
		isBlackberry: function () { return (this.platform === 'blackberry'); },
		isIos: function () { return (this.platform === 'ios'); },
		isAndroid: function () { return (this.platform === 'android'); },
		isWindows: function () { return (this.platform === 'wince'); },



		// Use these to check for a specific browser

		isOpera: function () { return this.browser === 'opera'; },
		isFirefox: function () { return this.browser === 'firefox'; },
		isSafari: function () { return this.browser === 'safari'; },
		isIe: function () { return this.browser === 'ie'; },
		isEdge: function () { return this.browser === 'edge'; },
		isChrome: function () { return this.browser === 'chrome'; },
		isBlink: function () { return this.browser === 'blink'; },

	},

	methods: {

		// Browser detection

		// Opera 8.0+
		getIsOpera: function () {
			return ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) ? true : false;
		},

		// Firefox 1.0+
		getIsFirefox: function () {
			return (typeof InstallTrigger !== 'undefined') ? true : false;
		},

		// At least Safari 3+: "[object HTMLElementConstructor]"
		getIsSafari: function () {
			return (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) ? true : false;
		},

		// Internet Explorer 6-11
		getIsIe: function () {
			return (/*@cc_on!@*/false || !!document.documentMode) ? true : false;
		},

		// Edge 20+
		getIsEdge: function () {
			return (!this.getIsIe() && !!window.StyleMedia) ? true : false;
		},

		// Chrome 1+
		getIsChrome: function () {
			return (!!window.chrome && !!window.chrome.webstore) ? true : false;
		},

		// Blink engine
		getIsBlink: function () {
			return ((this.getIsChrome() || this.getIsOpera()) && !!window.CSS) ? true : false;
		},

	}

};
