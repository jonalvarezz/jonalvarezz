'use strict';

var gulp				= require('gulp'),
	server				= require('gulp-express'),
	refresh				= require('gulp-livereload'),
	lrserver			= require('tiny-lr')(),
	rename				= require('gulp-rename'),
	stylus				= require('gulp-stylus'),
	nib					= require('nib'),
	staticPath			= './public/',

	// Build tools
	useref				= require('gulp-useref'),
	gulpif				= require('gulp-if'),
	imagemin			= require('gulp-imagemin'),
	uglify				= require('gulp-uglify'),
	minifyCss			= require('gulp-minify-css');

/*
 * Server process
 * Connect with express server to launch it and livereload
*/
gulp.task('server', function(){
	server.run({
		file: 'index.js'
	});

	//Set up your livereload server
	lrserver.listen(4002);
});


/*
 * Assets processing and livereload enabling
 * [css] : compile stylus files into css
 * [html]: reload page
*/

// Process CSS files and reload the web browser
gulp.task('css', function() {
	gulp.src( staticPath + 'css/main.styl' )
		.pipe(stylus({
			use: nib()
		}))
		.pipe(rename('main.min.css'))
		.pipe(gulp.dest( staticPath + 'css/min/'))
		.pipe(refresh(lrserver));
});

gulp.task('html', function(){
	gulp.src( staticPath + '**/*.html' )
		.pipe(refresh(lrserver));
});


/*
 * Watch functions
*/
gulp.task('watch', function() {
	gulp.watch( [staticPath + 'css/**/*.styl'], ['css'] );
	gulp.watch( [staticPath + '**/*.html'], ['html'] );
});


/*
 * Build tasks for production
*/

gulp.task('copy-static', function() {
	gulp.src( staticPath + 'index.html')
		.pipe(useref())
		.pipe(gulp.dest('./dist/public'));

	gulp.src( staticPath + 'css/fonts/**')
		.pipe(gulp.dest('./dist/public/fonts'));
	
	gulp.src( staticPath + 'img/**')
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(gulp.dest('./dist/public/img'));

	gulp.src( staticPath + 'favicon.ico')
		.pipe(gulp.dest('./dist/public'));

	gulp.src( 'app/**')
		.pipe(gulp.dest('./dist/app'));

	gulp.src( 'config/**')
		.pipe(gulp.dest('./dist/config'));

	gulp.src( 'index.js')
		.pipe(gulp.dest('./dist'));

	gulp.src( 'package.json')
		.pipe(gulp.dest('./dist'));

	gulp.src( 'README.md')
		.pipe(gulp.dest('./dist'));
});

gulp.task('compress-assets', function() {
	gulp.src( staticPath + 'index.html')
		.pipe(useref.assets())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('./dist/public'));
});

gulp.task('build', ['copy-static', 'compress-assets']);
gulp.task('default', [ 'server', 'css', 'watch' ]);