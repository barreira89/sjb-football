var mongoose = require('mongoose');
var scheduleService = require('./scheduleModel.js');

mongoose.connect('127.0.0.1:27017/nodetest1', function (err){
	if(err){
		console.log(err);
	}
});

scheduleService.getSchedule();