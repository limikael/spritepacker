#!/usr/bin/env node

var Spriter = require("./Spriter");
var SpriterSourceImage = require("./SpriterSourceImage");
var minimist = require("minimist");

function usage() {
	console.log("spriter - Build sprite maps.")
	console.log();
	console.log("Usage: spriter [options] <input files>");
	console.log();
	console.log("Options:");
	console.log("  --out <prefix>   - Use this output prefix, default is 'spritesheet'.");
	console.log("                     prefix.png and prefix.json will be generated.");
	console.log("  --series <size>  - Create a series of images with dimensions");
	console.log("                     size x size pixels. Output files will be");
	console.log("                     prefix0.png, prefix0.json, prefix1.png, prefix1.json");
	console.log();

	process.exit(1);
}

var minimistOpts = {
	string: ["out", "series"],
	unknown: function(opt) {
		if (opt[0] == "-")
			usage();
	}
};

var args = minimist(process.argv.slice(2), minimistOpts);
if (!args["_"].length)
	usage();

var spriter = new Spriter();

for (var i = 0; i < args["_"].length; i++)
	spriter.addSourceImage(new SpriterSourceImage(args["_"][i]));

if (args["out"])
	spriter.setDestPrefix(args["out"]);

if (args["series"])
	spriter.setFixedSize(args["series"]);

spriter.process().then(
	function() {},
	function(e) {
		console.log(e);
		process.exit(1);
	}
);