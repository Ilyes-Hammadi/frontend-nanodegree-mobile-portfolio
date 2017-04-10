'use strict'

var ngrok = require('ngrok');

module.exports = function (grunt) {

	// Load grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			minify: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				cwd: 'src/',
				expand: true,
				src: ['css/*.css', 'css/!*.min.css', 'views/css/*.css'],
				dest: 'dist/',
				ext: '.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['js/*.js', 'views/js/*.js'],
					dest: 'dist/'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					cwd: 'src',
					expand: true,
					src: ['*.html', 'views/**/*.html'],
					dest: 'dist'
				}]
			}
		},
		imagemin: {
			static: {
				options: {
					optimizationLevel: 7,
					svgoPlugins: [{
						removeViewBox: false
					}]
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['img/*.{png,jpg,gif}', 'views/images/*.{png,jpg,gif}'],
					dest: 'dist/'
				}]
			}
		},
		pagespeed: {
			options: {
				nokey: true,
				locale: "en_GB",
				threshold: 40
			},
			local: {
				options: {
					strategy: "desktop"
				}
			},
			mobile: {
				options: {
					strategy: "mobile"
				}
			}
		}
	});

	// Register customer task for ngrok
	grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function () {
		var done = this.async();
		var port = 9292;

		ngrok.connect(port, function (err, url) {
			if (err !== null) {
				grunt.fail.fatal(err);
				return done();
			}
			grunt.config.set('pagespeed.options.url', url);
			grunt.task.run('pagespeed');
			done();
		});
	});

	grunt.registerTask('default', ['cssmin', 'uglify', 'htmlmin', 'imagemin']);
};
