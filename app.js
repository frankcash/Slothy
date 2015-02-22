var express = require('express'),
  Fitbit = require('node-fitbit'),
  app = express(),
  config = require('./config/app')


app.use(express.cookieParser());
app.use(express.session({secret: 'hekdhthigib'}));

app.use(express.static(__dirname + '/public'));

/**
*@summary allows CORS
*/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes/main')(app, config, Fitbit);

console.log("listening on port: 3000");
app.listen(3000);
