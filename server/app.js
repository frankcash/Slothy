var express = require('express'),
  Fitbit = require('node-fitbit'),
  config = require('./config/app');

var log4js = require('log4js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var logger = log4js.getLogger();
var app = express()
mongoose.connect(config.db);;
app.use(cookieParser());
log4js.configure('config/log.json');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.session({secret: 'hekdhthigib'}));

app.use(express.static(__dirname + '/public'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes/route')(app, config, Fitbit, logger);

console.log("listening on port: 3000");
app.listen(3000);
