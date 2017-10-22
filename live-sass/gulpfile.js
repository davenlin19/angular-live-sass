'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var injectString = require('gulp-inject-string');
var argv = require('yargs').argv;

console.log(argv.selector);

/*
	Copy livesass.js to dist/live-sass
	Dependence: inject
*/
gulp.task('copy', ['inject'], function() {
	return gulp.src('./livesass.js')
			.pipe(gulp.dest('../dist/live-sass/'));
});

/*
	Inject livesass.js into index.html
*/
gulp.task('inject', function() {
	return gulp.src('../src/index.html')
			.pipe(
				inject(
					gulp.src('./livesass.js', {read: false})
						.pipe(gulp.dest('live-sass'))
				)
			)
			.pipe(gulp.dest('../src'));
});

/*
	Define component's selector
	Dependece: copy
*/
gulp.task('livesass', ['copy'], function() {
	if (argv.selector !== undefined) {
		gulp.src('../dist/live-sass/livesass.js')
			.pipe(injectString.prepend('var selector = \'' + argv.selector + '\';\n\n'))
			.pipe(gulp.dest('../dist/live-sass/'));
	}
});