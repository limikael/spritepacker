var SpriterDestImage = require("./SpriterDestImage");
var Thenable = require("tinp");

/**
 * Sprite packer.
 * @class Spriter
 */
function Spriter() {
	this.sourceImages = [];

	this.spacing = 2;
	this.destPrefix = "spritesheet_";
}

/**
 * Set dest prefix.
 * @method setDestPrefix
 */
Spriter.prototype.setDestPrefix = function(destPrefix) {
	this.destPrefix = destPrefix;
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

	this.unpacked.splice(this.unpacked.indexOf(im), 1);

	dest.putImageAt(x, y, im);

	this.packRegion(dest,
		x + im.getWidth() + this.spacing, y,
		w - (im.getWidth() + this.spacing), im.getHeight()
	);

	this.packRegion(dest,
		x, y + im.getHeight() + this.spacing,
		w, h - (im.getHeight() + this.spacing)
	);
}

/**
 * Load all source images.
 */
Spriter.prototype.loadSourceImages = function() {
	var thenables = [];

	for (var i = 0; i < this.sourceImages.length; i++)
		thenables.push(this.sourceImages[i].load());

	return Thenable.all(thenables);
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
		var destImage = new SpriterDestImage(this.destPrefix + this.destImages.length);
		this.packRegion(destImage, 0, 0, destImage.getWidth(), destImage.getHeight());
		this.destImages.push(destImage);
	}
}

/**
 * Save all destination images.
 * @method saveDestImages
 */
Spriter.prototype.save = function() {
	var thenables = [];

	for (var i = 0; i < this.destImages.length; i++) {
		thenables.push(this.destImages[i].saveJson());
		thenables.push(this.destImages[i].save());
	}

	return Thenable.all(thenables);
}

/**
 * Load source images, pack all images and save them.
 * @method packAndSaveImages
 */
Spriter.prototype.process = function() {
	var thenable = new Thenable();

	var scope = this;

	scope.loadSourceImages().then(
		function() {
			scope.packImages();
			scope.save().then(
				function() {
					thenable.resolve();
				},

				function(e) {
					thenable.reject(e);
				}
			)
		},

		function(e) {
			thenable.reject(e);
		}
	);

	return thenable;
}

module.exports = Spriter;