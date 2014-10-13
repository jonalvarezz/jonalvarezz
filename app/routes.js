/*
 * Default routes
 *
*/

var path = require('path');

module.exports = function(app) {

	// Server routes (API)

	// Searching the blog
	app.get('/blog', function(req, res){
		res.redirect('//blog.jonalvarezz.com');
	});

	// FrontEnd routes
	// Let's Angular.js handle those routes
	app.get('*', function(req, res){
		res.sendFile( 'index.html', {root: './public'} );
	});

};