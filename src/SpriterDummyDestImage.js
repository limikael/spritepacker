/**
 * Used only for measurements.
 * Uses the same "interface" as SpriterDestImage, i.e. quacks the same.
 * @class SpriterDummyDestImage
 */
function SpriterDummyDestImage(width, height) {
	this.width = width;
	this.height = height || width;
}

/**
 * Get width.
 * @method getWidth
 */
SpriterDummyDestImage.prototype.getWidth = function() {
	return this.width;
}

/**
 * Get height.
 * @method getHeight
 */
SpriterDummyDestImage.prototype.getHeight = function() {
	return this.height;
}

/**
 * Put image at.
 * @method putImageAt
 */
SpriterDummyDestImage.prototype.putImageAt = function() {

}

module.exports = SpriterDummyDestImage;