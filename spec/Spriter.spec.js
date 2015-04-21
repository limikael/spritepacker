var Spriter = require("../src/Spriter");
var SpriterSourceImage = require("../src/SpriterSourceImage");
var fs = require("fs-extra");

describe("Spriter", function() {
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
});