
var express         = require('express'),
    config          = require('./config/all'),
    app             = express();

// config express middleware
require('./config/express')(app);

// enable routes
require('./routes')(app);

// start server
app.listen(config.port, function () {
  console.log('Example app listening on port 3000!');
});