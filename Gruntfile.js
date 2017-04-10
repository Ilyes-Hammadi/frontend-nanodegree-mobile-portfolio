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
				expand: true,
				src: ['css/*.css', 'css/!*.min.css'],
				dest: 'dist/',
				ext: '.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'js/perfmatters.js',
				dest: 'dist/js/perfmatters.js'
			}
		},
		processhtml: {
			dist: {
				options: {
					process: true,
					data: {
						title: 'My app',
						message: 'This is production distribution'
					}
				},
				files: {
					'dist/index.min.html': ['index.html'],
					'dist/project-2048.min.html': ['project-2048.html'],
					'dist/project-mobile.min.html': ['project-mobile.html'],
					'dist/project-webperf.min.html': ['project-webperf.html'],
					'dist/views/pizza.html': ['views/pizza.html']
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'dist/index.min.html',
					'dist/project-2048.html': 'dist/project-2048.min.html',
					'dist/project-mobile.html': 'dist/project-mobile.min.html',
					'dist/project-webperf.html': 'dist/project-webperf.min.html',
					'dist/views/pizza.html': 'dist/views/pizza.html'
				}
			}
		},
		imagemin: { // Task
			static: { // Target
				options: { // Target options
					optimizationLevel: 7,
					svgoPlugins: [{
						removeViewBox: false
					}],
					// use: [mozjpeg()]
				},
				files: { // Dictionary of files
					'dist/img/2048.png': 'img/2048.png', // 'destination': 'source'
					'dist/img/cam_be_like.jpg': 'img/cam_be_like.jpg',
					'dist/img/mobilewebdev.jpg': 'img/mobilewebdev.jpg',
					'dist/img/profilepic.jpg': 'img/profilepic.jpg',
					'dist/views/images/pizza.png': 'views/images/pizza.png',
					'dist/views/images/pizzeria.jpg': 'views/images/pizzeria.jpg'
				}
			},
			dynamic: { // Another target
				files: [{
					expand: true, // Enable dynamic expansion
					cwd: 'img/', // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
					dest: 'dist/img/' // Destination path prefix
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
		},
		clean: ['dist*//*.min.*']
	});

	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-imagemin');



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


	grunt.registerTask('default', ['cssmin', 'uglify', 'processhtml', 'htmlmin', 'imagemin', 'psi-ngrok', 'clean']);
	grunt.registerTask('build', ['cssmin', 'uglify', 'htmlmin', 'processhtml', 'imagemin', 'psi-ngrok']);
};
