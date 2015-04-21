var path = require("path");

/**
 * Represents a SpriterSourceImage placed on a dest image.
 * @class SpriterImageEntry
 */
function SpriterImageEntry(sourceImage, x, y) {
	this.sourceImage = sourceImage;
	this.x = x;
	this.y = y;
}

/**
 * Get key.
 * @method getKey
 */
SpriterImageEntry.prototype.getKey = function() {
	return path.basename(this.sourceImage.getFileName());
}

/**
 * Get data to go in json.
 * @method getData
 */
SpriterImageEntry.prototype.getData = function() {
	return {
		"frame": {
			"x": this.x,
			"y": this.y,
			"w": this.sourceImage.getWidth(),
			"h": this.sourceImage.getHeight()
		}
	}
}

module.exports = SpriterImageEntry;