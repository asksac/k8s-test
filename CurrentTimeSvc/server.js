'use strict'; 

const express = require('express'), 
  morgan = require('morgan'), 
  winston = require('winston'); 

const app = express();

/*
var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
*/

// setup mogan middleware loggers
app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode < 400
  }, stream: process.stderr
}));

app.use(morgan('dev', {
  skip: function (req, res) {
      return res.statusCode >= 400
  }, stream: process.stdout
}));

// setup winston logger for application logging
const logLevel = process.env.LOG_LEVEL || 'debug';
const logFormat = winston.format; 
const logger = winston.createLogger({
  level: logLevel,
  format: logFormat.combine(
    logFormat.colorize(), 
    //logFormat.simple(), 
    logFormat.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }), 
    logFormat.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()]
});

// curl -X GET 'http://localhost:3000/time'
app.get('/time', (req, res) => {
  logger.debug('getTime operation called'); 
  return res.send(JSON.stringify({
    time: (new Date()).toISOString()
  }))
}); 

// default 404 handler 
app.use(function (req, res, next) {
  res.status(404).send("We're sorry, that resource was not found!"); 
}); 

var server = app.listen(3000, function () {
  console.log('service running on port: ', server.address().port); 
});

module.exports = app; 