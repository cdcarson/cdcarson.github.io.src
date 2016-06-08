var gulp        = require('gulp');
var gulp_front_matter = require('gulp-front-matter');
var assign = require('lodash.assign');
var gutil = require("gulp-util");








var onError = function (err) {
    'use strict';
    var gutil = require('gulp-util');
    gutil.log( gutil.colors.magenta(err.message), err);
    gutil.beep();
    this.emit('end');
};




gulp.task('default', function (cb) {
	var watch = require('gulp-watch');
	var plumber = require('gulp-plumber');
	var browserSync = require('browser-sync').create();
	var build = function (callback) {
		delete require.cache[require.resolve('./build.js')];
		require('./build.js')(callback);

	};

	build(function () {
		browserSync.init({
	        server: {
	            baseDir: './build'
	        },
			open: false
	    });
		watch(['./src/**/*.md', './layouts/**/*.swig', './build.js'], function () {
			build(function () {});
		});
		watch(['./build/**/*'], function () {
			browserSync.reload();
		});
	});



});
