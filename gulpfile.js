'use strict';

var gulp								= require('gulp'),
		server							= require('gulp-express'),
		refresh							= require('gulp-livereload'),
		lrserver						= require('tiny-lr')(),
		rename							= require('gulp-rename'),
		stylus							= require('gulp-stylus'),
		koutoSwiss					= require('kouto-swiss'),
		staticPath					=	'./public/';

/*
 * Server process
 * Connect with express server to launch it and livereload
*/
gulp.task('server', function(){
	server.run({
		file: 'server.js'
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
			use: koutoSwiss(),
			compress: true
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

gulp.task('default', [ 'server', 'css', 'watch' ]);