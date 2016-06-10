var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Logos = new Schema({
   team: String,
   logo: String
});

module.exports = mongoose.model('Logos', Logos);