module.exports = function(grunt) {
	grunt.loadNpmTasks('jasmine');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		yuidoc: {
			all: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: "src",
					outdir: "doc",
					preprocessor: ["yuidoc-die-on-warnings"]
				}
			}
		}
	});
}