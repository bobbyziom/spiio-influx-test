'use strict';

module.exports = {

	tsdb: {
		url: process.env.INFLUXDB_IRL || 'earthangel-a341ed15.influxcloud.net',
		user: process.env.INFLUXDB_USER || 'spiiotsdb',
		pw: process.env.INFLUXDB_PW || 'tsdbSpiio'
	},

	port: 3000
  
};