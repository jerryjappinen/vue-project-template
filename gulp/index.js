// Wrapper object to contain our gulp runner logic
module.exports = function (rawArgs) {
	var self = this;



	// Config
	self.configPaths = ['project.json', 'project-local.json'];
	self.helpersPath = 'helpers/';
	self.tasksPath = 'tasks/';
	self.pluginsToLoad = [
		'del',
		'fs',
		'js-string-escape',
		'merge',
		'merge-stream',
		'mkdirp',
		'mv',
		'node-cordova',
		'rmdir',
		'run-sequence',
		'strip-json-comments',
		'swig-marked'
	];

	// Params
	self.config = {};
	self.helpers = {};
	self.plugins = {};
	self.gulp = require('gulp');
	// self.args = { debug: (rawArgs && rawArgs.debug ? true : false) };
	self.args = rawArgs;

	// FIXME
	//  - this module handles uses unique keys to return each module
	//  - it does not separate between file and folder
	//  - use underscores in dir names to prevent name clashes and ignored files
	self.helperModules = require('require-dir')('./' + self.helpersPath, {
		recurse: true
	});
	self.taskModules = require('require-dir')('./' + self.tasksPath, {
		recurse: true
	});



	// Behavior

	// Custom configuration
	self.loadConfigs = function (paths) {
		var strip = require('strip-json-comments');
		var fs = require('fs');
		var _ = require('lodash');

		// Read each config file
		for (var i = 0; i < paths.length; i++) {
			var path = './' + paths[i];
			if (fs.existsSync(path)) {
				_.merge(self.config, JSON.parse(strip(fs.readFileSync(path, 'utf8'))));
			}
		}


		return self;
	};

	// Helpers
	self.loadHelpers = function (definition, fileBaseName) {
		if (typeof definition === 'function') {

			// Each helper gets access to self
			// NOTE: when function is passed, name must also be available
			self.helpers[fileBaseName] = definition(self);

		} else if (typeof definition === 'object') {
			for (var key in definition) {
				self.loadHelpers(definition[key], key);
			}
		}

		return self;
	};

	// Plugins
	self.loadPlugins = function (pluginNames) {

		// Autoload some gulp plugins
		var plugins = require('gulp-load-plugins')();

		// Manually load based on above config
		pluginNames.forEach(function (name) {
			plugins[self.helpers.dashedToCamelCase(name)] = require(name);
		});

		// Store
		self.plugins = plugins;

		return self;
	};

	self.preparePlugins = function () {
		return self;
	};

	// Load tasks from files
	self.loadTasks = function (g, p, c, h, definition) {
		if (typeof definition === 'function') {

			// This is where we run each task
			definition(g, p, c, h);

		} else if (typeof definition === 'object') {
			for (var key in definition) {
				self.loadTasks(g, p, c, h, definition[key]);
			}
		}

		return self;
	};



	// Life cycle
	self.run = function () {
		return self
			.loadConfigs(self.configPaths)
			.loadHelpers(self.helperModules)
			.loadPlugins(self.pluginsToLoad)
			.preparePlugins()
			.loadTasks(
				self.gulp,
				self.plugins,
				self.config,
				self.helpers,
				self.taskModules
			);
	};

};
