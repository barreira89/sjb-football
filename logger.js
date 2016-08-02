var logger = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');
var path = require('path');

var logDirectory  = path.join(__dirname, 'applog');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

var log = logger('combined', {stream: accessLogStream});

module.exports = log;
