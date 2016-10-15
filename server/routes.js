'use strict';

var path 			= require('path'),
	_ 				= require('lodash');

module.exports = function(app) {

	app.get('/', function(req, res) {
	  res.send('Server is up!');
	});	

	app.use('/data', require('./api/data'));
  
};