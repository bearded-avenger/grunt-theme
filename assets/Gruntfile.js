'use strict';
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // watch our project for changes
        watch: {
            compass: {
				files: ['sass/*.{scss,sass}'],
                tasks: ['compass']
            },
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'uglify']
            },
            livereload: {
                options: { livereload: true },
                files: ['css/master.css', 'js/build/*.js', '*.html', '../*.php', 'images/**/*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },
        // style (Sass) compilation via Compass
        compass: {
     		dist: {
                options: {
                    config: 'config.rb',
                    force: true
                }
            }
        },
        // let us know if our JS is sound
        jshint: {
            options: {
                "bitwise": true,
                "browser": true,
                "curly": true,
                "eqeqeq": true,
                "eqnull": true,
                "es5": true,
                "esnext": true,
                "immed": true,
                "jquery": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "node": true,
                "strict": false,
                "trailing": true,
                "undef": true,
                "globals": {
                    "jQuery": true,
                    "alert": true
                },
                "force" : true
            },
            all: [
                'Gruntfile.js',
                'js/src/*.js'
            ]
        },

        // concatenation and minification all in one
   		uglify: {
            plugins: {
                options: {
                    sourceMap: 'js/vendor.js.map',
                    sourceMappingURL: 'vendor.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'js/vendor.min.js': [
                    'js/source/vendor.js',
                    'js/vendor/**/*.js',
                    ]
                }
            },
            main: {
                options: {
                    sourceMap: 'js/src/main.js.map',
                    sourceMappingURL: 'main.js.map',
                    sourceMapPrefix: 2
                },
                files: {
                    'js/src/main.min.js': [
                        'js/src/main.js'
                    ]
                }
            }
        },
        // image optimization
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: 'images/*',
                    dest: 'images/'
                }]
            }
        },
        // version
        version: {
	      	options: {
	        	file: '',
	        	css: 'css/master.css',
	        	cssHandle: 'grunt-theme',
	        	js: 'js/scripts.js',
	        	jsHandle: 'grunt-scripts'
	      	}
	    },
        // deploy with rsync
        deploy: {
            options: {
                src: "./",
                args: ["--verbose"],
                exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc', '.npm-debug.log'],
                recursive: true,
                syncDestIgnoreExcl: true
            },
            production: {
                options: {
                    dest: "~/webapps/wordpress/wp-content/themes/grunt-theme/",
                    host: "nphaskins@nphaskins.webfactional.com"
                }
            }
        }

    });

    // not ready for this yet
    grunt.renameTask('rsync', 'deploy');

    // register task
    grunt.registerTask('default', ['watch']);

};