'use strict';

var config 		= require('../../config/all');

// initialize influx timeseries
var client = require('influx')({
  host: config.tsdb.url,
  protocol: 'https',
  username: config.tsdb.user,
  password: config.tsdb.pw,
  database: 'test'
});

exports.list = function(req, res) {

	client.query('SELECT * FROM sensor', function (err, results) {
		res.send(results);
	});

};

exports.create = function(req, res) {

	// assign sensor mac adress to local
	var sensor = req.params.id;

	// assign data arrays object to local 
	var data = req.body.value;

	// assign error report arrays object to local
	var error = req.body.report;

	// data point container
	var points = [];

	// feedback counter
	var count = 0;

	// format data points before sending
	for(var i = 0; i < data.moisture.length; i++) {

		var point = [ 
			{ 
				moisure: data.moisture[i],
				temp: data.temp[i],
				light: data.lux[i],
				battery: data.battery[i],
				time: data.time[i] * 1000
			}, 
			{
				version: 'prototype'
			} 
		];

		points.push(point);

		count++;

	}

	client.writePoints(sensor, points, function (err) {
		if(err) { 
			res.send(err); 
		} else {
			res.send('Stored ' + count + ' datapoints for ' + sensor + '!');
		}
	});

};

exports.find = function(req, res) {

	var query = 'SELECT * FROM \"' + req.params.id + '\"';

	client.query(query, function (err, results) {
		if(err) { res.send(err); }
		res.send(results);
	});

};

exports.delete = function(req, res) {

	// need to find right query

	var query = 'DROP SERIES FROM \"' + req.params.id + '\" WHERE time < \"' + req.params.time + '\"';

	console.log(query);

	client.query(query, function (err, results) {
		if(err) { res.send(err); }
		res.send(results);
	})

};

