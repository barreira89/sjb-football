var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Picks = new Schema({
    username: String,
	week: Number,
	updated: { type: Date, default: Date.now },
	picks: Schema.Types.Mixed 
});

module.exports = mongoose.model('Picks', Picks);