var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Leagues = new Schema({
    name: {type: String, unique: true, index: true},
	updated: { type: Date, default: Date.now },
	users: [String] 
});

module.exports = mongoose.model('Leagues', Leagues);