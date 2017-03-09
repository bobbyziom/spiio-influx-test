'use strict';

module.exports = {

	tsdb: {
		url: process.env.INFLUXDB_IRL,
		user: process.env.INFLUXDB_USER,
		pw: process.env.INFLUXDB_PW,
		db: process.env.INFLUXDB_DB
	},

	port: 3000
  
};