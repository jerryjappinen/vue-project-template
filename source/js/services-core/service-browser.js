
V.services.browser = {

	data: function () {
		return {

			inAppBrowserOptions: {

				// Set to yes or no to turn the InAppBrowser's location bar on or off.
				location: true,

				// True creates the browser and loads the page, but does not show it. `loadstop` event fires when loading is complete. False (default) opens and loads page normally.
				hidden: false,

				// Set to yes to prevent HTML5 audio or video from autoplaying (defaults to no).
				mediaPlaybackRequiresUserAction: false,



				// Android only

				// set to yes to have the session cookie cache cleared before the new window is opened
				// clearsessioncache
				// set to yes to show Android browser's zoom controls, set to no to hide them. Default value is yes.
				zoom: false,

				// set to yes to use the hardware back button to navigate backwards through the InAppBrowser's history. If there is no previous page, the InAppBrowser will close. The default value is yes, so you must set it to no if you want the back button to simply close the InAppBrowser.
				hardwareback: true,



				// iOS only

				// Done button's caption (need to localize this myself)
				closebuttoncaption: 'Done',

				// Turns on/off the UIWebViewBounce property
				// disallowoverscroll: true,

				// Turn the browser toolbar on/off (defaults to yes)
				toolbar: false,

				// Set to yes or no to prevent viewport scaling through a meta tag (defaults to no).
				// enableViewportScale: true,

				// Set to yes or no to allow in-line HTML5 media playback, displaying within the browser window rather than a device-specific playback interface. The HTML's video element must also include the webkit-playsinline attribute (defaults to no)
				allowInlineMediaPlayback: true,

				// Open the keyboard when form elements receive focus via focus() call (defaults to yes)?
				keyboardDisplayRequiresUserAction: true,

				// Wait until all new view content is received before being rendered (defaults to no)
				// suppressesIncrementalRendering: true,

				// Set to pagesheet, formsheet or fullscreen to set the presentation style (defaults to fullscreen)
				// presentationstyle: 'fullscreen',

				// fliphorizontal, crossdissolve or coververtical (defaults to coververtical)
				// transitionstyle: 'crossdissolve',

				// Set to top or bottom (default is bottom) to control toolbar position
				toolbarposition: 'top',



				// Windows only

				// True creates browser control without a border around it. if location=no is also specified, there will be no control presented to user to close
				fullscreen: true


			}

		};
	},

	computed: {

		inAppBrowser: function () {
			return app.plugins.browser;
		},

		missingBrowserHandler: function () {
			return app.env.isCordova && !this.inAppBrowser ? true : false;
		}

	},

	methods: {

		goTo: function (url) {
			window.open(url, '_self');
		},

		open: function (url, external, system) {

			// In-app browser plugin available, must be on mobile...
			// NOTE: see https://www.npmjs.com/package/cordova-plugin-inappbrowser
			if (this.inAppBrowser) {

				// Open an in-app browser instance
				var browser = this.inAppBrowser.open(url, (system ? '_system' : '_blank'), this.inAppBrowserOptions);

			// Just go with the current browser
			} else {

				// Warn if we really should have a browser instance but don't
				if (this.missingBrowserHandler) {
					log.warn('Missing the in-app browser plugin - unable to handle links on this device.');
				}

				// Open in current or new tab
				window.open(url, (external ? '_blank' : '_self'));

			}

		},

		// Some heuristics to determine whether a LINK ELEMENT is external or not
		linkIsExternal: function (link) {
			if (link) {

				// Get some important parameters
				// var href = link.getAttribute('href');
				var target = link.getAttribute('target');
				var magicInternalAttribute = link.getAttribute('data-internal');
				var targetIsBlank = target && target === '_blank';
				var hostnameMatches = link.hostname === location.hostname;

				// Magical attribute makes the link internal
				if (magicInternalAttribute) {
					return false;

				// Otherwise go by specified target
				} else if (targetIsBlank) {
					return true;

				// ...or compare to hostname on web
				} else if (app.env.isWeb && !hostnameMatches) {
					return true;
				}

			}
			return null;
		},

		onInit: function () {
			if (this.missingBrowserHandler) {
				log.warn('Missing the in-app browser plugin - unable to handle links on this device.');
			}
		}

	}

};
