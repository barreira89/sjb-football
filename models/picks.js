var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Game = require('./games');

var Picks = new Schema({
    username: String,
	userId: String,
	week: Number,
	game: {type: Schema.Types.ObjectId, ref: 'Games'},
	winner: String,
  result: String,
  season: Number
},
{
	timestamps: true

});

module.exports = mongoose.model('Picks', Picks);
