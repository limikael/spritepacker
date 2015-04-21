var fs = require('fs-extra');
var SpriterDestImage = require("../src/SpriterDestImage");
var SpriterSourceImage = require("../src/SpriterSourceImage");
var Thenable = require("tinp");

describe("SpriterDestImage", function() {
	beforeEach(function() {
		fs.mkdirsSync(__dirname + "/tmp");
	});

	it("can create an image and save it", function(done) {
		var s = new SpriterDestImage(__dirname + "/tmp/create_and_save");

		s.save().then(done);
	});

	it("catches errors", function(done) {
		var s = new SpriterDestImage("/some/non/existing/path/image");

		s.save().then(
			function() {},
			function() {
				done();
			}
		);
	});

	it("can create an image and save it", function(done) {
		var source1 = new SpriterSourceImage(__dirname + "/data/bigButton.png");
		var source2 = new SpriterSourceImage(__dirname + "/data/wrenchIcon.png");

		Thenable.all(source1.load(), source2.load()).then(function() {
			var dest = new SpriterDestImage(__dirname + "/tmp/added_images", 512, 512);

			dest.putImageAt(100, 0, source1);
			dest.putImageAt(200, 200, source2);

			dest.save().then(done);
		});
	});
});