var SpriterSourceImage = require("../src/SpriterSourceImage");

describe("SpriterSourceImage", function() {
	it("can load an image and check size", function(done) {
		var s = new SpriterSourceImage(__dirname + "/data/table.png");

		s.load().then(function() {
			//console.log("loaded, area: " + s.getArea() + " w:" + s.getWidth());

			expect(s.getHeight()).toBe(412);
			expect(s.getWidth()).toBe(772);
			expect(s.getArea()).toBe(318064);

			expect(s.fitsIn(1, 1)).toBe(false);
			expect(s.fitsIn(772, 412)).toBe(true);
			expect(s.fitsIn(1024, 1024)).toBe(true);

			done();
		});
	});

	it("handles errors", function(done) {
		var s = new SpriterSourceImage(__dirname + "/../Gruntfile.js");

		s.load().then(
			function() {},
			function() {
				done();
			}
		);
	});
});