var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Picks = require('./picks');



var Account = new Schema({
    username: String,
    password: String,
	email: String,
	roles: [String],
	picks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Picks'}]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);