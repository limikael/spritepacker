#!/usr/bin/env node

var Spriter = require("./Spriter.js");
var minimist = require("minimist");

function usage() {
	console.log("spriter - Build sprite maps.")
	console.log();
	console.log("Usage: spriter [options] <input files>");
	console.log();
	console.log("Options:");
	console.log("  --out <prefix>   - Use this output prefix.");
	console.log("                     prefix.png and prefix.json will be generated.");
	console.log("  --series <size>  - Create a series of images with dimensions")
	console.log("                     size x size pixels.")
	console.log();

	process.exit(1);
}

var minimistOpts = {
	unknown: usage
};

var args = minimist(process.argv.slice(2), minimistOpts);

console.log(args);