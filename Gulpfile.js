var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-ruby-sass'),
	plumber = require('gulp-plumber'),
	ts = require('gulp-typescript');

gulp.task('connect', function(){
	connect.server({
		root: './app',
		port: 7777,
		livereload: true
	});
});

gulp.task('sass', function(){
	gulp
		.src('./scss/style.scss')
		.pipe(plumber())
		.pipe(sass({style: 'expanded'}))
		.pipe(gulp.dest('./app/css'));
});

gulp.task('ts', function(){
	gulp
		.src('./ts/*.ts')
		.pipe(gulp.dest('./app/js'));
});

gulp.task('watch', function(){
	gulp.watch('./scss/*.scss', ['sass']);
	gulp.watch('./ts/*.ts', ['ts']);
	gulp.watch(['./app/*.html', './app/css/style.css', './app/js/*.js'], function(){
		gulp.src('app/*.html').pipe(connect.reload());
	});
});

gulp.task('default', ['connect', 'watch']);