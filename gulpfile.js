var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var server = require('browser-sync').create();
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');


gulp.task('style', function () {
return gulp.src('less/style.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(gulp.dest('css'))
		.pipe(server.stream());
});

gulp.task('serve', function() {
	server.init({
		server: "."
		});

	gulp.watch('less/**/*.less', gulp.series('style'));
	gulp.watch('*.html')
		.on('change', server.reload);
});

gulp.task('images', function () {
return gulp.src('img/source/**/*.{png,jpg,svg}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true}),
			imagemin.svgo()
			]))
		.pipe(gulp.dest('img/'));
});

gulp.task('sprite', function () {
return gulp.src('img/icon-*.svg')
		.pipe(svgstore({
			inlineSVG: true
			}))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest('img/'));
});