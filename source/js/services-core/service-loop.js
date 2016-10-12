
V.services.loop = {

	data: function () {
		return {

			// Callbacks within each buckets will be executed asynchronoysly
			callbacks: {

				// MainLoop.setBegin()
				// the begin function runs at the beginning of each frame and is typically used to process input.
				frameStart: [],

				// MainLoop.setUpdate()
				// the update function runs zero or more times per frame depending on the frame rate. It is used to compute anything affected by time - typically physics and AI movements.
				frameUpdate: [],

				// MainLoop.setDraw()
				// the draw function should update the screen, usually by changing the DOM or painting a canvas.
				frameDraw: [],

				// MainLoop.setEnd()
				// the end function runs at the end of each frame and is typically used for cleanup tasks such as adjusting the visual quality based on the frame rate.
				frameEnd: []

			}

		};
	},

	computed: {

		isAvailable: function () {
			return app.plugins.mainLoop ? true : false;
		}

	},

	methods: {

		// API for registering loop callbacks

		onFrameStart: function (callback) {
			this.callbacks.frameStart.push(callback);
			return this;
		},

		onFrameUpdate: function (callback) {
			this.callbacks.frameUpdate.push(callback);
			return this;
		},

		onFrameDraw: function (callback) {
			this.callbacks.frameDraw.push(callback);
			return this;
		},

		onFrameEnd: function (callback) {
			this.callbacks.frameEnd.push(callback);
			return this;
		},



		// Run callbacks
		runCallbacks: function (key) {
			for (var i = 0; i < this.callbacks[key].length; i++) {
				this.callbacks[key][i]();
			}
			return this;
		},

		runFrameStart: function () {
			return this.runCallbacks('frameStart');
		},

		runFrameUpdate: function () {
			return this.runCallbacks('frameUpdate');
		},

		runFrameDraw: function () {
			return this.runCallbacks('frameDraw');
		},

		runFrameEnd: function () {
			return this.runCallbacks('frameEnd');
		},



		// MainLoop setup

		getIsRunning: function () {
			return app.plugins.mainLoop.isRunning();
		},

		getFps: function () {
			return app.plugins.mainLoop.getFPS();
		},

		stop: function () {
			if (this.isAvailable) {
				if (this.getIsRunning()) {
					app.plugins.mainLoop.stop();
				}
			}
			return this;
		},

		start: function (maxFps) {

			if (this.isAvailable) {
				if (!this.getIsRunning()) {

					if (maxFps) {
						app.plugins.mainLoop.setMaxAllowedFPS(maxFps);
					}

					// Register each callback in MainLoop
					// NOTE: if user never starts this, nothing will be registered to MainLoop either
					MainLoop
						.setBegin(this.runFrameStart)
						.setUpdate(this.runFrameUpdate)
						.setDraw(this.runFrameDraw)
						.setEnd(this.runFrameEnd)

						// Start MainLoop
						.start();

				}
			}

			return this;
		}

	}

};



