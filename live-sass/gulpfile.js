'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var injectString = require('gulp-inject-string');
var argv = require('yargs').argv;
var fs = require('fs');
var watch = require('gulp-watch');
var map = require('map-stream');

var scssFile = '';
var tsFile = '';

if (argv.dirPath !== undefined) {
	var segments = argv.dirPath.split('/');

	if (segments[segments.length - 1] === '') {
		scssFile = argv.dirPath + segments[segments.length - 2] + '.component.scss';
		tsFile = argv.dirPath + segments[segments.length - 2] + '.component.ts';
	} else {
		scssFile = argv.dirPath + '/' + segments[segments.length - 2] + '.component.scss';
		tsFile = argv.dirPath + '/' + segments[segments.length - 2] + '.component.ts';
	}
}

console.log('SCSS', scssFile);
console.log('TS', tsFile);

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
	gulp.src('../' + tsFile)
	    .pipe(map(function(file, callback) {
		    var match = file.contents.toString().match(/selector: '(.*)',/i);
		    fs.readFile('../dist/live-sass/livesass.js', function read(err, data) {
			    if (match) {
				    fs.writeFile('../dist/live-sass/livesass.js', 'var selector = \'' + match[1] + '\';\n\n' + data.toString());
			    }
			    callback(null, file);
		    });
	    }));
});

/*
	Compile scss to css
*/
gulp.task('compile', function () {
	return gulp.src('../' + scssFile)
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(sourcemaps.mapSources(function(sourcePath, file) {
				return scssFile;
			}))
			.pipe(sourcemaps.write({includeContent: false, sourceRoot: 'file:///Users/lampt/Work/dev/angular-live-sass'}))
			.pipe(gulp.dest('../dist/live-sass'));
});

gulp.task('default', ['livesass'], function() {
	if (scssFile !== '' && tsFile !== '') {
		gulp.watch('../' + scssFile, ['livesass']);
	} else {
		return 'File not found';
	}
});