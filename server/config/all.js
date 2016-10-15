'use strict';

module.exports = {

	tsdb: {
		url: process.env.INFLUXDB_IRL,
		user: process.env.INFLUXDB_USER,
		pw: process.env.INFLUXDB_PW
	},

	port: 3000
  
};