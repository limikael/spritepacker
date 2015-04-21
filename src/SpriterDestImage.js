var PNGImage = require('pngjs-image');
var Thenable = require("tinp");
var SpriterImageEntry = require("./SpriterImageEntry");
var fs = require("fs");
var path = require("path");

/**
 * @class SpriterDestImage
 */
function SpriterDestImage(fileNamePrefix, width, height) {
	this.fileNamePrefix = fileNamePrefix;

	this.width = width || 1024;
	this.height = height || 1024;

	this.image = new PNGImage.createImage(this.width, this.height);

	this.imageEntries = [];
}

/**
 * Get width.
 * @method getWidth
 */
SpriterDestImage.prototype.getWidth = function() {
	return this.width;
}

/**
 * Get height.
 * @method getHeight
 */
SpriterDestImage.prototype.getHeight = function() {
	return this.height;
}

/**
 * Save the png image. Not the json.
 * @method save
 */
SpriterDestImage.prototype.save = function(fileNamePrefix) {
	if (fileNamePrefix)
		this.fileNamePrefix = fileNamePrefix;

	var thenable = new Thenable();

	this.image.writeImage(this.fileNamePrefix + ".png", function(err) {
		if (err)
			thenable.reject(err);

		else
			thenable.resolve();
	});

	return thenable;
}

/**
 * Save json.
 * @method saveJson
 */
SpriterDestImage.prototype.saveJson = function() {
	var json = JSON.stringify(this.getData(), null, 4);

	fs.writeFileSync(this.fileNamePrefix + ".json", json);

	return Thenable.resolved();
}

/**
 * Get data.
 * @method getData
 */
SpriterDestImage.prototype.getData = function() {
	o = {};
	o.frames = {};

	for (var i = 0; i < this.imageEntries.length; i++) {
		var entry = this.imageEntries[i];

		o.frames[entry.getKey()] = entry.getData();
	}

	o.meta = {
		"app": "Spriter",
		"version": "0.1",
		"image": path.basename(this.fileNamePrefix + ".png"),
		"format": "RGBA8888",
		"scale": 1,
		"size": {
			"w": this.getWidth(),
			"h": this.getHeight()
		}
	};

	return o;
}

/**
 * Put a source image at xpos, ypos. Add an entry to the image map.
 * @method putImageAt
 */
SpriterDestImage.prototype.putImageAt = function(xpos, ypos, im) {
	this.imageEntries.push(new SpriterImageEntry(im, xpos, ypos));

	for (var y = 0; y < im.getHeight(); y++)
		for (var x = 0; x < im.getWidth(); x++)
			this.image.setPixel(xpos + x, ypos + y, im.image.getPixel(x, y));
}

module.exports = SpriterDestImage;