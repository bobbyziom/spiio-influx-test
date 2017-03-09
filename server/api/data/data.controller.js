'use strict';

var config 		= require('../../config/all'),
	Keen		= require('keen-js');

// initialize influx timeseries
var client = require('influx')({
	host: config.tsdb.url,
	username: config.tsdb.user,
	password: config.tsdb.pw,
	database: config.tsdb.db
});

var keen = new Keen({
	projectId: '576e733333e4063bc0d7dc3d', // String (required always)
	writeKey: 'f2c4cf42b860398c689032aff3ad03cf01c6d1ca1fb6547c03b0ba46a830a678d2768a68a04ab968b732103ab49cd31c3081fdc9f68ead8dc47a4b99c6e2782d1332eb67a006c88ed552d61a6998d7683863e73bb82372720dd9583fb3e46d40',   // String (required for sending data)
	readKey: '822f21ad8a25c6a07cb04d7ba07e7b12da3bb24a3248c39ac433ff39d4d46965ca97f75713c4fe5f95c6f7b12ca27ac8c0804c7c9543f5461c8e98decce2022299bcbe0a50eebb3ef0fb0f909719b7079e59fb2dd3825a38fe7df67e2f621652'      // String (required for querying data)

	// protocol: "https",         // String (optional: https | http | auto)
	// host: "api.keen.io/3.0",   // String (optional)
	// requestType: "jsonp"       // String (optional: jsonp, xhr, beacon)
});

var copyToInflux = function(sensor, data, done) {

	console.log('Copying data from keen tsdb...')

	var points = [];

	for(var i = 0; i < data.length; i++) {

		var point = [ 
			{ 
				moisture: data[i].moisture,
				temp: data[i].temp,
				light: data[i].light,
				battery: data[i].battery,
				time: data[i].keen.timestamp
			}, 
			{
				version: 'prototype',
				copy: true
			} 
		];

		points.push(point);

	};

	console.log('Writing datapoints to influx tsdb.')

	client.writePoints(sensor, points, function (err) {
		if(err) { 
			res.send(err); 
		} else {
			done(sensor);
		}
	});

};

var takeFromKeen = function(devices, index) {

	console.log('Fetching data from keen tsdb on id: ' + devices[index]);

	Keen.ready(function(){

		// Create a query instance
		var query = new Keen.Query('extraction', {
			eventCollection: devices[index],
			timeframe: 'this_6_months',
			timezone: 'UTC'
		});

		// Send query
		keen.run(query, function(err, resp){
			if (err) {
				// there was an error!
				console.log('Error: ' + err);
			}
			else {
				// do something with res.result
				console.log('Data fetched from keen tsdb.')
				copyToInflux(devices[index], resp.result, function(sensor) {
					console.log('All data from ' + sensor + ' copied to Influx TSDB');
					if(index < devices.length) {
						takeFromKeen(devices, index+1);
					} else {
						return 'All data copied';
					}
				});

			}
		});

	});

}

exports.list = function(req, res) {

	client.query('SELECT * FROM sensor', function (err, results) {
		res.send(results);
	});

};

exports.old = function(req, res) {

	Keen.ready(function(){

		// Create a query instance
		var query = new Keen.Query('extraction', {
			eventCollection: req.params.id,
			timeframe: 'this_3_months',
			timezone: 'UTC'
		});

		// Send query
		keen.run(query, function(err, resp){
			if (err) {
				// there was an error!
				console.log('Error: ' + err);
			}
			else {
				// do something with res.result
				res.send(resp.result);

			}
		});

	});

};

exports.copy = function(req, res) { 

	var deviceList = [
		'0c2a6909f58d',
		'0c2a6909f193',
		'0c2a690857c6',
		'0c2a690864c8',
		'0c2a69099909',
		'0c2a6909b605',
		'0c2a6909f83f',
		'0c2a6909f1e5',
		'0c2a690864ca',
		'0c2a690861ef',
		'0c2a6908647a',
		'0c2a6908593b',
		'0c2a6909f676',
		'0c2a69085960',
		'0c2a6908648e',
		'0c2a69086d7f',
		'0c2a6909f587',
		'0c2a69084f5b',
		'0c2a69086475',
		'0c2a690857c7',
		'0c2a6908730e',
		'0c2a6909be55',
		'0c2a6909c197',
		'0c2a69084f60',
		'0c2a69086cc3',
		'0c2a69084f58',
		'0c2a69086d95',
		'0c2a6909f2bb',
		'0c2a6909f152',
		'0c2a69086498',
		'0c2a69086d8b',
		'0c2a69087242',
		'0c2a690868d7',
		'0c2a6909f64b',
		'0c2a690864b6',
		'0c2a69084d71',
		'0c2a690854ee',
		'0c2a6909bf72',
		'0c2a69086a20',
		'0c2a6909bdb1',
		'0c2a69085759',
		'0c2a69086a5e',
		'0c2a6909bfaf',
		'0c2a690864c3',
		'0c2a690870fe',
		'0c2a690868cf',
		'0c2a6909f806',
		'0c2a69086900',
		'0c2a6909f52b',
		'0c2a69086d20',
		'0c2a69085759',
		'0c2a6908595f',
		'0c2a6909bf72',
		'0c2a6909f7e4',
		'0c2a69085352',
		'0c2a69099c6f',
		'0c2a6909f434',
		'0c2a6908697d',
		'0c2a69086d82',
		'0c2a69085962',
		'0c2a690864b8',
		'0c2a69086a5c',
		'0c2a690867d4',
		'0c2a690cc87f',
		'0c2a6909bf76',
		'0c2a69085cb5',
		'0c2a6908647f',
		'0c2a6909f3c3',
		'0c2a69086904',
		'0c2a690851ae',
		'0c2a69085e4d',
		'0c2a69086a59',
		'0c2a6909f309',
		'0c2a69085e6b',
		'0c2a69051bcd',
		'0c2a690cc87a',
		'0c2a690cc7e0',
		'0c2a6908557e',
		'0c2a69085754',
		'0c2a6909f30a',
		'0c2a6908673c',
		'0c2a690d09f3',
		'0c2a690d0793',
		'0c2a690d0a10',
		'0c2a690d085d',
		'0c2a690d0881',
		'0c2a690cc866',
		'0c2a690d0840',
		'0c2a690cc7d7',
		'0c2a690d0a2e',
		'0c2a690d0a05',
		'0c2a690d0842',
		'0c2a690d0850',
		'0c2a690d0a15',
		'0c2a690d07fe',
	];

	var done = takeFromKeen(deviceList, 0);

	res.send(done);

};

exports.copyAll = function(req, res) {

	var deviceList = [
		'0c2a6909f58d',
		'0c2a6909f193',
		'0c2a690857c6',
		'0c2a690864c8',
		'0c2a69099909',
		'0c2a6909b605',
		'0c2a6909f83f',
		'0c2a6909f1e5',
		'0c2a690864ca',
		'0c2a690861ef',
		'0c2a6908647a',
		'0c2a6908593b',
		'0c2a6909f676',
		'0c2a69085960',
		'0c2a6908648e',
		'0c2a69086d7f',
		'0c2a6909f587',
		'0c2a69084f5b',
		'0c2a69086475',
		'0c2a690857c7',
		'0c2a6908730e',
		'0c2a6909be55',
		'0c2a6909c197',
		'0c2a69084f60',
		'0c2a69086cc3',
		'0c2a69084f58',
		'0c2a69086d95',
		'0c2a6909f2bb',
		'0c2a6909f152',
		'0c2a69086498',
		'0c2a69086d8b',
		'0c2a69087242',
		'0c2a690868d7',
		'0c2a6909f64b',
		'0c2a690864b6',
		'0c2a69084d71',
		'0c2a690854ee',
		'0c2a6909bf72',
		'0c2a69086a20',
		'0c2a6909bdb1',
		'0c2a69085759',
		'0c2a69086a5e',
		'0c2a6909bfaf',
		'0c2a690864c3',
		'0c2a690870fe',
		'0c2a690868cf',
		'0c2a6909f806',
		'0c2a69086900',
		'0c2a6909f52b',
		'0c2a69086d20',
		'0c2a69085759',
		'0c2a6908595f',
		'0c2a6909bf72',
		'0c2a6909f7e4',
		'0c2a69085352',
		'0c2a69099c6f',
		'0c2a6909f434',
		'0c2a6908697d',
		'0c2a69086d82',
		'0c2a69085962',
		'0c2a690864b8',
		'0c2a69086a5c',
		'0c2a690867d4',
		'0c2a690cc87f',
		'0c2a6909bf76',
		'0c2a69085cb5',
		'0c2a6908647f',
		'0c2a6909f3c3',
		'0c2a69086904',
		'0c2a690851ae',
		'0c2a69085e4d',
		'0c2a69086a59',
		'0c2a6909f309',
		'0c2a69085e6b',
		'0c2a69051bcd',
		'0c2a690cc87a',
		'0c2a690cc7e0',
		'0c2a6908557e',
		'0c2a69085754',
		'0c2a6909f30a',
		'0c2a6908673c',
		'0c2a690d09f3',
		'0c2a690d0793',
		'0c2a690d0a10',
		'0c2a690d085d',
		'0c2a690d0881',
		'0c2a690cc866',
		'0c2a690d0840',
		'0c2a690cc7d7',
		'0c2a690d0a2e',
		'0c2a690d0a05',
		'0c2a690d0842',
		'0c2a690d0850',
		'0c2a690d0a15',
		'0c2a690d07fe',
	];

	for(var i = 0; i < deviceList.length; i++) {
		console.log('Fetching data from keen tsdb on id: ' + deviceList[i]);

		Keen.ready(function(){

			// Create a query instance
			var query = new Keen.Query('extraction', {
				eventCollection: deviceList[i],
				timeframe: 'this_6_months',
				timezone: 'UTC'
			});

			// Send query
			keen.run(query, function(err, resp){
				if (err) {
					// there was an error!
					console.log('Error: ' + err);
				}
				else {
					// do something with res.result
					console.log('Data fetched from keen tsdb.')
					copyToInflux(deviceList[i], resp.result, function(sensor) {
						console.log('All data from ' + sensor + ' copied to Influx TSDB');
						
					});

				}
			});

		});
	}

	res.send('All data copied to Influx TSDB');

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
				moisture: Math.floor(0.0026*data.moisture[i]-69.29),
				temp: data.temp[i],
				light: data.lux[i],
				battery: data.battery[i],
				time: data.time[i] * 1000
			}, 
			{
				version: 'prototype'
			} 
		];

		console.log('Moisture ADC: ' + data.moisture[i] + ' (converted: ' + point[0].moisture);

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
		res.send(results[0]);
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

