var PNGImage = require('pngjs-image');
var Thenable = require("tinp");

/**
 * @class SpriterSourceImage
 */
function SpriterSourceImage(fileName) {
	this.fileName = fileName;
}

/**
 * Does this image fit in this width and height?
 * @method fitsIn
 */
SpriterSourceImage.prototype.fitsIn = function(w, h) {
	return (w >= this.getWidth() && h >= this.getHeight());
}

/**
 * Load image.
 * @method load
 */
SpriterSourceImage.prototype.load = function(fileName) {
	if (fileName)
		this.fileName = fileName;

	var thenable = new Thenable();

	this.image = PNGImage.readImage(this.fileName, function() {
		if (!this.image._image.data)
			thenable.reject("Unable to load image: " + this.fileName);

		else
			thenable.resolve();
	}.bind(this));

	return thenable;
}

/**
 * Get height.
 * @method getHeight
 */
SpriterSourceImage.prototype.getHeight = function() {
	return this.image.getHeight();
}

/**
 * Get width.
 * @method getWidth
 */
SpriterSourceImage.prototype.getWidth = function() {
	return this.image.getWidth();
}

/**
 * Get area.
 * @method getArea
 */
SpriterSourceImage.prototype.getArea = function() {
	return this.getWidth() * this.getHeight();
}

/**
 * Get file name.
 * @method getFileName
 */
SpriterSourceImage.prototype.getFileName = function() {
	return this.fileName;
}

module.exports = SpriterSourceImage;