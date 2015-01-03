/*
 * Server file
 * Configure the server
 *
*/

var express				= require('express'),
	path				= require('path'),
	app					= express(),	
	bodyParser			= require('body-parser'),
	methodOverride		= require('method-override'),
	favicon				= require('serve-favicon'),
	livereload;

var port = process.env.PORT || 4000;

// Set default enviroment as development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Configure express server
// ============================================

// Development enviroment additional settings
if( process.env.NODE_ENV === 'development' ) {

	console.log('Running in ' + process.env.NODE_ENV + ' enviroment');

	// Enable livereload
	livereload	= require('connect-livereload');
	app.use( livereload( {port: 4002} ) );
}

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use( express.static( path.join(__dirname, 'public') ));

// serve the favicon
app.use( favicon( ( path.join(__dirname, 'public/favicon.ico') ) ));

// routes
// ============================================
require('./app/routes')(app); // configure our routes


// start app
// ============================================
app.listen(port);


// shoutout to the user
console.log('Magic happening on port http://localhost:' + port);
// expose app           
exports = module.exports = app;