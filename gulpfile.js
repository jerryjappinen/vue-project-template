// Run all the things
var rawArgs = require('yargs').argv;
var G = require('./gulp/index.js');
var main = new G(rawArgs);
main.run();