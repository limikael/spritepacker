var SpriterDestImage = require("./SpriterDestImage");

/**
 * Sprite packer.
 * @class Spriter
 */
function Spriter() {
	this.sourceImages = [];
}

/**
 * Add a source image.
 * @method addSourceImage
 */
Spriter.prototype.addSourceImage = function(sourceImage) {
	this.sourceImages.push(sourceImage);
}

/**
 * Find the image the best fits into the region.
 * @method findBestImageForRegion
 */
Spriter.prototype.findBestImageForRegion = function(w, h) {
	var biggest = 0;
	var found;

	for (var i = 0; i < this.unpacked.length; i++) {
		var cand = this.unpacked[i];

		if (cand.fitsIn(w, h) && cand.getArea() > biggest) {
			biggest = cand.getArea();
			found = cand;
		}
	}

	return found;
}

/**
 * Pack a region of a dest image with source images.
 * @method packRegion
 */
Spriter.prototype.packRegion = function(dest, x, y, w, h) {
	var im = this.findBestImageForRegion(w, h);

	if (!im)
		return;

	dest.putImageAt(x, y, im);
}

/**
 * Pack all images.
 * @method packImages
 */
Spriter.prototype.packImages = function() {
	this.destImages = [];
	this.unpacked = [];

	for (var i = 0; i < this.sourceImages.length; i++)
		this.unpacked.push(this.sourceImages[i]);

	while (this.unpacked.length > 0) {
		var destImage = new SpriterDestImage(this.destImages.length);
		this.packRegion(destImage, 0, 0, destImage.getWidth(), destImage.getHeight());
		this.destImages.push(destImages);
	}
}

/**
 * Save all destination images.
 * @method saveDestImages
 */
Spriter.prototype.saveDestImages = function() {
	for (var i = 0; i < this.destImages.length; i++) {
		this.destImages[i].writeJson();
		this.destImages[i].writePng();
	}
}

/**
 * Pack all images and save them.
 * @method packAndSaveImages
 */
Spriter.prototype.packAndSaveImages = function() {
	this.packImages();
	this.saveDestImages();
}

module.exports = Spriter;