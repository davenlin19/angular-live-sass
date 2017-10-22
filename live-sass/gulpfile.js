'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');

gulp.task('livesass', ['inject'], function() {
	return gulp.src('../live-sass/removestyle.js')
			.pipe(gulp.dest('../dist/live-sass/'));
});

gulp.task('inject', function() {
	return gulp.src('../src/index.html')
			.pipe(
				inject(
					gulp.src('./removestyle.js', {read: false})
						.pipe(gulp.dest('live-sass'))
				)
			)
			.pipe(gulp.dest('../src'));
});