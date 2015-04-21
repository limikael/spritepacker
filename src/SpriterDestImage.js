var PNGImage = require('pngjs-image');
var Thenable = require("tinp");

/**
 * @class SpriterDestImage
 */
function SpriterDestImage(fileName, width, height) {
	this.fileName = fileName;

	this.width = width || 1024;
	this.height = height || 1024;

	this.image = new PNGImage.createImage(this.width, this.height);
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
 * Save.
 * @method save
 */
SpriterDestImage.prototype.save = function(fileName) {
	if (fileName)
		this.fileName = fileName;

	var thenable = new Thenable();

	this.image.writeImage(this.fileName, function(err) {
		if (err)
			thenable.reject(err);

		else
			thenable.resolve();
	});

	return thenable;
}

/**
 * Put a source image at.
 * @method putImageAt
 */
SpriterDestImage.prototype.putImageAt = function(xpos, ypos, im) {
	for (var y = 0; y < im.getHeight(); y++)
		for (var x = 0; x < im.getWidth(); x++)
			this.image.setPixel(xpos + x, ypos + y, im.image.getPixel(x, y));
}

module.exports = SpriterDestImage;