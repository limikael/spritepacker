/**
 * @class SpriterDestImage
 */
function SpriterDestImage(index) {
	this.index = index;

	this.width = 1024;
	this.height = 1024;
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

module.exports = SpriterDestImage;