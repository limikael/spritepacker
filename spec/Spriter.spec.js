var Spriter = require("../src/Spriter");
var SpriterSourceImage = require("../src/SpriterSourceImage");
var fs = require("fs-extra");

describe("Spriter", function() {
	beforeEach(function() {
		fs.mkdirsSync(__dirname + "/tmp");
	});

	it("can generate a sprite sheet", function(done) {
		var s = new Spriter();

		s.setDestPrefix(__dirname + "/tmp/basic_spritesheet_");

		files = fs.readdirSync(__dirname + "/data")

		for (i = 0; i < files.length; i++)
			s.addSourceImage(new SpriterSourceImage(__dirname + "/data/" + files[i]));

		/*s.addSourceImage(new SpriterSourceImage(__dirname + "/data/bigButton.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol0.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol1.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol2.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol3.png"));*/

		s.process().then(function() {
			//console.log(s.destImages[0].getData());

			done();
		});
	});

	it("can suggest a size", function(done) {
		var s = new Spriter();

		expect(s.suggestSize()).toEqual(2);

		files = fs.readdirSync(__dirname + "/data")

		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/bigButton.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol0.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol1.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol2.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol3.png"));

		s.loadSourceImages().then(function() {
			var size = s.suggestSize();

			//console.log("suggested size: " + size);

			expect(size).toEqual(128);
			done();
		});
	});

	it("can suggest a size", function(done) {
		var s = new Spriter();

		expect(s.suggestSize()).toEqual(2);

		files = fs.readdirSync(__dirname + "/data")

		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/bigButton.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol0.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol1.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol2.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol3.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip0.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip1.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip2.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip3.png"));

		s.loadSourceImages().then(function() {
			var size = s.suggestSize();

			//console.log("suggested size: " + size);

			expect(size).toEqual(256);
			done();
		});
	});

	it("can generate a series of images", function(done) {
		var s = new Spriter();

		// TODO: ensure old images are gone.

		s.setDestPrefix(__dirname + "/tmp/basic_spritesheet_");

		s.setFixedSize(100);

		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/bigButton.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol0.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol1.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol2.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol3.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip0.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip1.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip2.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip3.png"));

		s.process().then(function() {
			// TODO: expect generated images to exist.
			//console.log(s.destImages[0].getData());

			done();
		});
	});

	it("generates an error if the images don't fit", function(done) {
		var s = new Spriter();

		s.setDestPrefix(__dirname + "/tmp/basic_spritesheet_");

		s.setFixedSize(5);

		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/bigButton.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol0.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol1.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol2.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/suitSymbol3.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip0.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip1.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip2.png"));
		s.addSourceImage(new SpriterSourceImage(__dirname + "/data/chip3.png"));

		s.process().then(
			function() {},
			function(e) {
				console.log(e);
				done();
			}
		);
	});
});