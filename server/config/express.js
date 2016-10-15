/**
 * Express configuration
 */

'use strict';

var express 		= require('express'),
	bodyParser		= require('body-parser'),
	methodOverride 	= require('method-override'),
	cookieParser	= require('cookie-parser'),
	errorHandler	= require('errorhandler'),
	path			= require('path'),
	compression		= require('compression'),
	cors 			= require('cors');

module.exports = function(app) {

	// configure bodyParser to parse request bodies
	app.use(bodyParser.urlencoded({ extended: false }));
  	app.use(bodyParser.json());

  	// configure cookieParser to parse request cookies
  	app.use(cookieParser());

  	// use gzip compression for every call
  	app.use(compression());

  	// allow cors for frontend
  	app.use(function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Encoding');
	  res.header('Access-Control-Allow-Methods', 'GET,PUT,HEAD,POST,DELETE,OPTIONS');
	  next();
	});

  	// check for credentials and authorize/deny access 
  	// only on public and private routes (std routes go to API documentation)
	// app.use(["/public*", "/private*"], jwt({ secret: auth.secretCallback }));

	// handling CORS pre-flight requests
	app.options('*', cors());

	// redirect error if authentication for private endpoints
  	//app.use(auth.unauthorizedMessage);

  	// override with different headers; last one takes precedence
	app.use(methodOverride('X-HTTP-Method'));          // Microsoft
	app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
	app.use(methodOverride('X-Method-Override'));      // IBM

	// enable full error stack traces and live reload in development
	if(process.env.NODE_ENV === 'development') {
		console.log('Running express development config');
		//app.use(errorHandler());
	}

};