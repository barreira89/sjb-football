var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Schedules = new Schema({
  games: [{
	_id: false,
	home: String,
	visitor: String,
	winner: String,
	gid: Number,
	homescore: Number,
	visitscore: Number,
	weekNumber: Number
  }],
  weekNumber: Number
},{collection: 'schedule'});

module.exports = mongoose.model('Schedules', Schedules);