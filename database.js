var mongo = require('mongojs');
var dbURL = 'jonalvarezz';
var collections = ['works'];

var db = mongo(dbURL, collections);
module.exports = db;
