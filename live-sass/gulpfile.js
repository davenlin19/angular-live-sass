'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var injectString = require('gulp-inject-string');
var search = require('gulp-search');
var replace = require('gulp-replace');
var argv = require('yargs').argv;
var fs = require('fs');
var find = require('gulp-find');
var watch = require('gulp-watch');

/*
	Copy livesass.js to dist/live-sass
	Dependence: inject
*/
gulp.task('copy', ['inject:js'], function() {
	return gulp.src('./livesass.js')
			.pipe(gulp.dest('../dist/live-sass/'));
});

/*
	Inject livesass.js into index.html
*/
gulp.task('inject:js', function() {
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
	Inject livesass.js into index.html
*/
gulp.task('inject:css', ['compile'], function() {
	return gulp.src('../src/index.html')
			.pipe(
				inject(
					gulp.src('../dist/live-sass/*.css', {read: false})
						.pipe(gulp.dest('live-sass'))
				)
			)
			.pipe(gulp.dest('../src'));
});

/*
	Define component's selector
	Dependece: copy
*/
gulp.task('livesass', ['copy', 'inject:css'], function() {
	if (argv.selector !== undefined) {
		return gulp.src('../dist/live-sass/livesass.js')
			.pipe(injectString.prepend('var selector = \'' + argv.selector + '\';\n\n'))
			.pipe(gulp.dest('../dist/live-sass/'));
	} else {
		return 'Selector not found';
	}
});

/*
	Compile scss to css
*/
gulp.task('compile', function () {
	// if (argv.path !== undefined) {
		return gulp.src('../src/app/contract/contract.component.scss')
				.pipe(sourcemaps.init())
				.pipe(sass().on('error', sass.logError))
				.pipe(sourcemaps.mapSources(function(sourcePath, file) {
					return 'src/app/contract/' + sourcePath;
				}))
				.pipe(sourcemaps.write({includeContent: false, sourceRoot: 'file:///Users/lampt/Work/dev/angular-live-sass'}))
				.pipe(gulp.dest('../dist/live-sass'));
	// } else {
	// 	return 'File not found';
	// }
});

gulp.task('default', ['livesass'], function() {
	gulp.watch('../src/app/contract/contract.component.scss', ['livesass']);
});